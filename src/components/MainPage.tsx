import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { auth, provider } from "../main";
import { userAtom } from "../store/atoms/user";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import HomePage from './HomePage'
import GamePage from "./GamePage";

const login = async () => {
  await signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if(!credential){
      return;
    }
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
  }).catch((error) => {
    // Handle Errors here.
    console.error(error)
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}


export default function MainPage() {
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(()=> {
    onAuthStateChanged(auth, async function(user){
      if(user && user.email){
        const token = await user.getIdToken()
        console.log(user)
        setUser({
          loading: false,
          user: {
            email: user.email,
            accessToken: token,
            displayName: user.displayName? user.displayName: "no name"
          },
        })
      } else {
        setUser({
          loading: false
        })
        console.log("There is no logged in user")
      }
    })

  }, [])

  if(user.loading){
    return <div>Loading</div>
  }
  
  if(!user.user){
    return (
        <Card>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Login
          </Typography>
          <Button onClick={() => login()}>Sign in with Google 🚀 </Button>
        </Card>
      )
  }
  return <HomePage/>
}
