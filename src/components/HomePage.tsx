import { Box, Button } from '@mui/material'
import { useRecoilState } from 'recoil'
import { userAtom } from '../store/atoms/user'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { backend_url } from '../creds/backend_cred'
import { useEffect } from 'react'

const createGame = () => {
    
}

function HomePage() {
    const [user, _] = useRecoilState(userAtom)
    const navigate = useNavigate()
    if (!user.user) {
        navigate("/")
    }
    useEffect(() => {
        axios.post(
            backend_url + "/users",
            {},
            {
                headers: {
                    "token" : user.user?.accessToken
                }
            }
        ).then((response)=>{
            console.log(response)
        }).catch(console.error)
    }, [])
    return (
        <Box margin="auto">
            <Button onClick={() => createGame()}>Create Game</Button>
        </Box>
    )
}

export default HomePage