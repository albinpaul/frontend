import { useOutlet } from "react-router-dom";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";
import SignOutButton from "./SignOutButton";

export const HomeLayout = () => {
  const outlet = useOutlet();
  const [user, _] = useRecoilState(userAtom)
  console.log(user)
  let headerContent = <div />
  if (user.user) {
    let loggedInContent = <>
      <Box display="flex" flexDirection="row" minHeight="3em" justifyContent="center" alignItems="center" marginX="1em" width="100%">
        <Typography variant="h6" component="div">
          {user.user.displayName}
        </Typography>
        <Box margin="1em">
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
