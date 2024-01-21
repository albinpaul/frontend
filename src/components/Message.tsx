import { Alert, AlertColor } from '@mui/material';
import React, { useState, useEffect } from 'react'

const Message = ({ variant, children, deleteCallback }: 
    { variant: AlertColor,children: React.ReactNode , deleteCallback: ()=> void }) => {
    const [show, setShow] = useState(true)

    // On componentDidMount set the timer
    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setShow(false)
        }, 3000)

        return () => {
            clearTimeout(timeId)
            deleteCallback()
        }
    }, []);

    // If show is false the component will return null and stop here
    if (!show) {
        return null;
    }

    // If show is true this will be returned
    return (
        <Alert severity={variant}>
            {children}
        </Alert>
    )
}

Message.defaultPros = {
    variant: 'success',
}

export default Message;