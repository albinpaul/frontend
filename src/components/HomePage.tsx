import { Alert, Box, Button, Container, Modal, Typography, useTheme } from '@mui/material'
import { useRecoilState } from 'recoil'
import { userAtom } from '../store/atoms/user'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { backend_url } from '../creds/backend_cred'
import { useEffect, useRef, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import { v4 as uuid } from "uuid";
import Message from './Message'
import CloseIcon from '@mui/icons-material/Close';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  color: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function HomePage() {
    const [user, _] = useRecoilState(userAtom)
    const [socket, setSocket] = useState<Socket | null>(null)
    const [events, setEvents] = useState<Map<string, string>>(new Map());
    const [room, setRooms] = useState<string[]>([])
    const nameInputRef = useRef(null)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate()

    useEffect(() => {
        const newSocket = io(backend_url, {
            auth: {
                access_token: user.user?.accessToken,
                display_name: user.user?.displayName
            },
            transports: ['websocket']
        })
        setSocket(newSocket)
        const handler = (rooms: string[]) => {
            console.log("recived" + rooms)
            if (rooms) {
                setRooms(rooms)
            }
        }
        newSocket.on("recieve_rooms", handler)
        newSocket.connect()
        setSocket(newSocket)
        console.log("newSocket is " + newSocket.connected)
        return () => {
            console.log("closing socket", newSocket.connected)
            newSocket.off("recieve_rooms", handler)
            newSocket.close()
        }
    }, [setSocket])
    
    useEffect(() => {
        getRooms()
    }, [])

    if (!user.user) {
        navigate("/")
    }
    const createRoom = async () => {
        await socket?.emit("create_room", (room_id: string) => {
            let id = uuid()
            let newEvents = new Map();
            events.forEach((v, k) => {
                newEvents.set(k, v)
            })
            newEvents.set(id, "joined room " + room_id)
            setEvents(newEvents)
            socket.emit("get_rooms")
        })
    }

    const instance = axios.create({
        baseURL: backend_url,
        timeout: 1000,
    });
    const getRooms = () => {
        return instance.get("/users", {
            headers: {
                "token": user.user?.accessToken,
            }
        }).then((response) => {
            let data = response.data.user.rooms
            console.log(data)
            setRooms(data)
        }).catch(console.error)
    }

    const deleteRoom = (room_id: string) => {
        instance.delete("/users/" + room_id, {
            headers: {
                "token": user.user?.accessToken,
            }
        }).then((response) => {
            return getRooms()
        }).catch(console.error)

    }

    const deleteCallback = (id: string) => {
        let newEvents = new Map();
        events.forEach((v, k) => {
            newEvents.set(k, v)
        })
        newEvents.delete(id);
        setEvents(events)
    }

    const handleJoinRoom = (event: any) => {
        event.preventDefault() 
        console.log("got submit")
        let val = nameInputRef?.current?.value
        console.log(val)
        socket?.emit("join_room", val, ()=>{
            handleClose()
            navigateToRoom(val)
        })
    }

    const navigateToRoom = (room_id: string) => {
        navigate("/room/" + room_id)
    }

    const theme = useTheme()
    return (
        <>
            <Box margin="auto">
                {
                    [...events.keys()].map(
                        id => <Message key={id} variant='success' deleteCallback={() => deleteCallback(id)}>
                            {events.get(id)}
                        </Message>
                    )
                }
                <Box bgcolor="white" padding="1em" borderRadius="1em">
                    <Button onClick={() => createRoom()}>Create Room</Button>
                    <Button onClick={handleOpen}>Join Room</Button>
                    <h3 style={{ color: `${theme.palette.text.primary}` }}>Rooms you are part of</h3>
                    <Container maxWidth="sm">
                        {room.map(room =>
                            <Box
                                flexDirection="row"
                                display="flex"
                                alignItems="center" justifyContent="space-between"
                            >
                                <Button variant="contained"
                                    onClick={() => navigateToRoom(room)}
                                    style={
                                        {
                                            backgroundColor: `${theme.palette.primary.main}`,
                                            margin: "0.3em 0",
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between"

                                        }
                                    }
                                >
                                    <p style={{ color: `${theme.palette.text.secondary}` }}>{room}</p>
                                </Button>
                                <Button variant="text" onClick={() => { deleteRoom(room) }}>

                                    <CloseIcon
                                        style={{ color: `${theme.palette.text.primary}` }}

                                    />
                                </Button>
                            </Box>
                        )}
                    </Container>
                </Box>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                     <form onSubmit={handleJoinRoom}>
                        <input type="text" placeholder="Name" ref={nameInputRef} />
                        <button type="submit">Register</button>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default HomePage