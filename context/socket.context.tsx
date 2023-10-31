"use client";

import { createContext, useContext, useState } from "react";

const SocketContext = createContext<SocketContextType | null>(null);

export default function SocketContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [onMessage, setOnMessage] = useState<WebSocket["onmessage"] | null>(
        null
    );
    const [onError, setOnError] = useState<WebSocket["onerror"] | null>(null);
    const [onOpen, setOnOpen] = useState<WebSocket["onopen"] | null>(null);

    const socketInitilizer = () => {
        const user = JSON.stringify({ uid: 1 });
        const socket = new WebSocket(
            `ws://localhost:3001/chat/connection/${user}`
        );
        socket.onopen = onOpen;
        socket.onerror = onError;
        socket.onmessage = onMessage;
    };

    return (
        <SocketContext.Provider
            value={{
                socket,
                setSocket,
                onMessage,
                setOnMessage,
                onError,
                setOnError,
                onOpen,
                setOnOpen,
                socketInitilizer,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
}

export function useSocket() {
    const context = useContext(SocketContext);

    if (context === null) {
        throw new Error(
            "useSocket must be used within a SocketContextProvider"
        );
    }
    return context;
}
