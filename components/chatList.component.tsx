import React from "react";
import ChatListItem from "./chatListItem.component";

type ChatListProps = {
    items: UserChatListItemType[];
};

export default function ChatList({ items }: ChatListProps) {
    return (
        <div className="bg-mainDarkBg w-1/4 overflow-y-auto chatlist-group">
            <ul>
                {items.map((data) => {
                    return (
                        <ChatListItem
                            key={`${data.chat_id}-chat-item`}
                            user={data}
                        />
                    );
                })}
            </ul>
        </div>
    );
}
