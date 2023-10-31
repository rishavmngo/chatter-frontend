"use client";
import Image from "next/image";
import React from "react";
import { clsx } from "clsx";
import { useActiveChat } from "@/context/chats.context";
import { timeAgo } from "@/lib/utils";

interface chatListItemType {
    user: UserChatListItemType;
}

export default function ChatListItem({ user }: chatListItemType) {
    const { setActiveChatItem, activeChatItem } = useActiveChat();
    return (
        <li
            onClick={() => setActiveChatItem(user)}
            className={clsx(
                "h-200  relative overflow-hidden flex flex-row p-3 gap-4 m-2 rounded-lg hover:bg-secondaryDarkBg cursor-pointer",
                {
                    "bg-secondaryDarkBg":
                        activeChatItem?.chat_id === user.chat_id,
                }
            )}
        >
            <Image
                src="/img-1.jpg"
                className=" w-[60px] h-[60px] rounded-[15px] object-cover "
                width="60"
                height="60"
                alt="profile"
            />
            <div className="flex-grow">
                <h3 className="text-lg font-medium text-white">
                    {user.partner_name}
                </h3>
                <p className="text-sm text-gray-400">I want to ask you...</p>
            </div>
            <div className="text-lg text-white/50">
                <p>{timeAgo(user.last_active_at, false)}</p>
            </div>
        </li>
    );
}
