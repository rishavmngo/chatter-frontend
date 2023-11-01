"use client";

import React, { createContext, useContext, useState } from "react";

const ChatsItemContext = createContext<ChatsItemContextType | null>(null);

export default function ChatsContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [activeChatItem, setActiveChatItem] =
        useState<UserChatListItemType | null>(null);

    const [activeChatMessages, setActiveChatMessages] = useState<
        ActiveChatMessageType[]
    >([]);

    const [chatListItem, setChatListItem] = useState<UserChatListItemType[]>(
        []
    );

    return (
        <ChatsItemContext.Provider
            value={{
                activeChatItem,
                setActiveChatItem,
                chatListItem,
                setChatListItem,
                activeChatMessages,
                setActiveChatMessages,
            }}
        >
            {children}
        </ChatsItemContext.Provider>
    );
}

export function useActiveChat() {
    const context = useContext(ChatsItemContext);

    if (context === null) {
        throw new Error(
            "useActiveChat must be used within a ChatsContextProvider"
        );
    }
    return context;
}
