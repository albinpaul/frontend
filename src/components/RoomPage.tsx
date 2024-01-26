import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userAtom } from '../store/atoms/user'
import { Box, Button } from '@mui/material'
import { Socket, io } from 'socket.io-client'
import { backend_url } from '../creds/backend_cred'
import { auth } from '../main'
import { setUserId } from 'firebase/analytics'
import axios from 'axios'

export default function RoomPage() {
    const [user, _] = useRecoilState(userAtom)
    const [socket, setSocket] = useState<Socket | null>(null)
    const [members, setMembers] = useState<string[]>([])
    const [games, setGames] = useState<string[]>([])
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
        newSocket.connect()
        setSocket(newSocket)
        newSocket.on("send_client_names", names => {
            setMembers(names)
        })
        let timeId = setInterval(()=>{
            newSocket?.emit("get_connected_sockets", roomId)
        }, 3000)
        newSocket.on("game_created", (game_id: string)=>{
            navigate("/game/" + game_id, {state: {roomId: roomId}})
        })
        newSocket.on("all_games_in_room", (games) => {
            setGames(games)
        })
        let timeId2 = setTimeout(() => {
            newSocket?.emit("join_room", roomId)
            newSocket?.emit("get_all_game_in_room", roomId)
        }, 500)
        return () => {
            // console.log("closing socket", newSocket.connected)
            clearInterval(timeId)
            clearTimeout(timeId2)
            newSocket.close()
        }
    }, [])

    const createGame = () => {
        socket?.emit("create_game", roomId)
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
                <h3>Games Played</h3>
                <ol>
                    {games.map((gameId) => 
                        <li><Link to={"/game/" + gameId} state={roomId}>{gameId}</Link></li>
                    )}
                </ol>
            </Box>
        </>
    )
}
