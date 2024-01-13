import { signOut } from 'firebase/auth';
import { auth } from '../main';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SignOutButton() {
  const navigate = useNavigate()
  const logout = () => {
    signOut(auth).then(() => {
      navigate("/")
    }).catch((error) => {
      console.error(error)
    });
  }

  return (
    <Button color='inherit' onClick={() => logout()}>Sign out</Button>
  )
}
