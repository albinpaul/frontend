import { Box, Button, Grid } from "@mui/material";
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
    console.log(token)
    console.log(user
      )
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
    onAuthStateChanged(auth, function(user){
      if(user && user.email){
        setUser({
          loading: false,
          user: {
            email: user.email
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        minWidth="100vw"
      >
        <Grid item xs={3}>
          <h2>Login</h2>
          <br />
          <br />
          <Button onClick={() => login()}>Sign in with Google 🚀 </Button>
        </Grid>
      </Box>
      )
  }
  return <HomePage/>
}
