import { Box, Button } from '@mui/material'
import { useRecoilState } from 'recoil'
import { userAtom } from '../store/atoms/user'
import { Navigate, useNavigate } from 'react-router-dom'

const createGame = () => {

}

function HomePage() {
    const [user, setUser] = useRecoilState(userAtom)
    const navigate = useNavigate()
    if(!user.user){
        navigate("/")
    }
    return (
        <>
            <Box margin="auto">
                <Button onClick={() => createGame()}>Create Game</Button>
            </Box>
        </>
    )
}

export default HomePage