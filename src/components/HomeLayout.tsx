import { Navigate, useOutlet } from "react-router-dom";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";
import SignOutButton from "./SignOutButton";

export const HomeLayout = () => {
  const outlet = useOutlet();
  const [user, _] = useRecoilState(userAtom)
  console.log(user)
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
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {user.user?.displayName}
              </Typography>
              {
               user.user? <SignOutButton/> : <div/>
              }
            </Toolbar>
          </AppBar>
        </Box>
        {outlet}
      </Box>

    </div>
  );
};
