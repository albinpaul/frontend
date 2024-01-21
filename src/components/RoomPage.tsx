import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userAtom } from '../store/atoms/user'
import { Box, Button } from '@mui/material'
import { Socket, io } from 'socket.io-client'
import { backend_url } from '../creds/backend_cred'

export default function RoomPage() {
    const [user, _] = useRecoilState(userAtom)
    const [socket, setSocket] = useState<Socket | null>(null)
    const [members, setMembers] = useState<string[]>([])
    const navigate = useNavigate()
    if (!user.user) {
        navigate("/")
    }
    let { roomId } = useParams()

    useEffect(() => {
        const newSocket = io(backend_url, {
            auth: {
                access_token: user.user?.accessToken,
                display_name: user.user?.displayName
            },
            transports: ['websocket']
        })
        setSocket(newSocket)
        newSocket.connect()
        newSocket.on("send_client_names", names => {
            setMembers(names)
        })
        newSocket.on("get_game_info", ()=>{

        })
        let timeId = setInterval(() => {
            newSocket?.emit("get_clients", roomId)
        }, 1200);
        let timeId2 = setTimeout(() => {
            newSocket?.emit("join_room", roomId)
        }, 500)
        return () => {
            console.log("closing socket", newSocket.connected)
            clearInterval(timeId)
            clearTimeout(timeId2)
            newSocket.close()
        }
    }, [])

    const createGame = () => {
    }
    return (
        <>
            <Box bgcolor="white" padding="1em" borderRadius="1em" color="black" width="calc(60% - 2em)">
                <Box display="flex">
                    <h3>Room id - {roomId}</h3>
                    <Button onClick={() => {
                        navigator.clipboard.writeText(roomId ? roomId : "")
                    }}>
                        Copy
                    </Button>
                </Box>
                {
                    members.map(member => <p> {member}</p>)
                }
                <Button onClick={()=> createGame()}>Create Game</Button>
            </Box>
        </>
    )
}
