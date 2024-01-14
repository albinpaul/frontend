import { useOutlet } from "react-router-dom";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
export const OverFlowHiddenLayout = ({children}: any) => {
    return (
    <div>
      <Box overflow="hidden" height="100vh">
        {children}
      </Box>

    </div>
  );
};
