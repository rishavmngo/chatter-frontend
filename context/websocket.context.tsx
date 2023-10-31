"use client";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import {
    createContext,
    useContext,
    useMemo,
    useEffect,
    ReactNode,
} from "react";

type WSProviderProps = { children: ReactNode; url?: string };

export const WSStateContext = createContext<WebSocket | null>(null);

export default function WSProvider({
    children,
    url,
}: WSProviderProps): JSX.Element {
    const { data, status } = useSession();

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

    return (
        <WSStateContext.Provider value={wsInstance}>
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
