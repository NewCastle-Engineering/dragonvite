import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { CONFIG } from '@config/index';
export function useSocket() {
    const socketRef = useRef(null);
    useEffect(() => {
        if (socketRef.current)
            return;
        socketRef.current = io(CONFIG.SOCKET_URL, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5,
        });
        socketRef.current.on('connect', () => {
            console.log('Socket connected:', socketRef.current?.id);
        });
        socketRef.current.on('disconnect', () => {
            console.log('Socket disconnected');
        });
        socketRef.current.on('error', (error) => {
            console.error('Socket error:', error);
        });
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, []);
    return socketRef.current;
}
