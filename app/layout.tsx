"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatsContextProvider from "@/context/chats.context";
import SocketContextProvider from "@/context/socket.context";
import WSProvider from "@/context/websocket.context";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-[#131313]`}>
                <SessionProvider>
                    <WSProvider>
                        <SocketContextProvider>
                            <ChatsContextProvider>
                                {children}
                            </ChatsContextProvider>
                        </SocketContextProvider>
                    </WSProvider>
                </SessionProvider>
                <Toaster />
            </body>
        </html>
    );
}
