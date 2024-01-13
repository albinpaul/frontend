import { signOut } from 'firebase/auth';
import { auth } from '../main';
import { Button } from '@mui/material';

const logout = () => {
  signOut(auth).then(() => {
  // Sign-out successful.
  }).catch((error) => {
    console.error(error)
  });
}

export default function Header() {
  return (
        <Button onClick={() => logout()}>Sign out</Button>
  )
}
