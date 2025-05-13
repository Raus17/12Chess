import React, { useEffect } from 'react'
const  WS_URL = 'ws://localhost:8040/ws'

export const useSocket = () => {
    const [socket , setSocket] = React.useState<WebSocket | null>(null)

    useEffect(() => {
        const ws = new WebSocket(WS_URL) 

        ws.onopen = () => {
            console.log('WebSocket connection established')
            setSocket(ws)
        }

        ws.onclose = () => {
            console.log('WebSocket connection closed');
            setSocket(null);
        }

        return () => {
            ws.close()
        }
    }, [])  

    return socket;
}
