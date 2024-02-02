import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './App.tsx'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from "recoil";
import { ThemeProvider, createTheme } from '@mui/material';


import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyApCzpLkOz2mnlSwmGkTP2mX65GS6U4gig",
  authDomain: "memory-fd4ef.firebaseapp.com",
  projectId: "memory-fd4ef",
  storageBucket: "memory-fd4ef.appspot.com",
  messagingSenderId: "121855764312",
  appId: "1:121855764312:web:38e17994dd563c3a41a72d",
  measurementId: "G-GT7EC2JPNC"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const provider = new GoogleAuthProvider();
export const auth = getAuth();


const theme = createTheme({
  palette: {
    primary: { main: "#3a34d2" },
    text: {
      secondary: "white"
    }
  },
});



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
)
