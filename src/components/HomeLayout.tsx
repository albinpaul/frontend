import { useNavigate, useOutlet } from "react-router-dom";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";
import SignOutButton from "./SignOutButton";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../main";

export const HomeLayout = () => {
  const outlet = useOutlet();
  const [user, setUser] = useRecoilState(userAtom)
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, async function (user) {
      if (user && user.email) {
        const token = await user.getIdToken()
        // console.log("token is " + token)
        setUser({
          loading: false,
          user: {
            email: user.email,
            accessToken: token,
            displayName: user.displayName ? user.displayName : "no name",
            photoUrl: user.photoURL ? user.photoURL : "no photo"
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

  // console.log(user)
  let headerContent = <div />
  if (user.user) {
    let loggedInContent = <>
      <Box display="flex" flexDirection="row" minHeight="3em" justifyContent="center" alignItems="center" marginX="1em" width="100%">
        <Typography variant="h6" component="div" onClick={() => navigate("/home/")}>
          {user.user.displayName}
        </Typography>
        <Box margin="1em" onClick={() => navigate("/home/")}>
          <img src={user.user?.photoUrl} width="30em" height="30em" />
        </Box>
        <Box marginLeft="auto">
          <SignOutButton />
        </Box>
      </Box>
    </>

    headerContent = <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
        </IconButton>
        {loggedInContent}
      </Toolbar>
    </AppBar>
  }
  return (
    <div>
      <Box display="flex"
        flexDirection="column"
        alignItems="center"
        minHeight="100vh"
        minWidth="100vw"
        flexWrap="wrap"
      >
        <Box minWidth="100vw">
          {headerContent}
        </Box>
        {outlet}
      </Box>

    </div>
  );
};
