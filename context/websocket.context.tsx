"use client";
import { useSession } from "next-auth/react";
import { createContext, useMemo, useEffect, ReactNode, useState } from "react";

type WSProviderProps = { children: ReactNode; url?: string };

export const WSStateContext = createContext<WSStateContextType | null>(null);

export default function WSProvider({
    children,
    url,
}: WSProviderProps): JSX.Element {
    const { data, status } = useSession();
    const [WSReady, setWSReady] = useState(false);
    interface UserData {
        user: {
            id: string; // Define the correct type of id
            // Other properties as needed
        };
        // Other properties as needed
    }
    const wsInstance = useMemo(() => {
        return typeof window != "undefined" && status === "authenticated"
            ? new WebSocket(
                  `ws://localhost:3001/chat/connection/${JSON.stringify({
                      id: data?.user.id,
                  })}`
              )
            : null;
    }, [status]);

    useEffect(() => {
        return () => {
            if (wsInstance?.readyState !== 3) wsInstance?.close();
        };
    }, []);

    useEffect(() => {
        if (wsInstance)
            wsInstance.onopen = () => {
                setWSReady(true);
                console.log("hello world");
            };
    }, [wsInstance]);

    return (
        <WSStateContext.Provider value={{ wsInstance, WSReady, setWSReady }}>
            {children}
        </WSStateContext.Provider>
    );
}

// export function useWS(): WebSocket {
//     const context = useContext(WSStateContext);
//
//     if (context == undefined) {
//         throw new Error("useWS must be used within a WSProvider");
//     }
//
//     return context;
// }
