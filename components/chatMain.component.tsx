"use client";
import React, { useContext, useEffect } from "react";
import ChatList from "./chatList.component";
import ChatMessageContainer from "./chatMessageContainer.component";
import { useActiveChat } from "@/context/chats.context";
import useEventContext, { sendMessage } from "@/context/event.context";
import { Events } from "@/lib/event";
import { WSStateContext } from "@/context/websocket.context";

export default function MainChat() {
    const { activeChatItem, chatListItem } = useActiveChat();
    const wsSocket = useContext(WSStateContext);
    useEventContext();
    console.log(wsSocket);
    useEffect(() => {
        // console.log(wsSocket);
        // console.log("part 1");
        sendMessage(Events.getAllChatsEvent);
    }, [wsSocket, wsSocket?.readyState]);

    return (
        <div className="bg-mainDarkBg flex-grow flex h-full gap-2">
            {chatListItem && <ChatList items={chatListItem} />}
            {activeChatItem && <ChatMessageContainer user={activeChatItem} />}
        </div>
    );
}
