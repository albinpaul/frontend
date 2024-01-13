import React from 'react'
import Header from './Header'
import { Box } from '@mui/material'

function HomePage() {
    return (
        <>
            <Box display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh" minWidth="100vw"
                flexWrap="wrap"
            >
                <Box alignSelf="start" marginLeft="auto">
                    <Header />
                </Box>
            
                <Box  margin="auto">HomePage</Box>
            </Box>
        </>
    )
}

export default HomePage