import React, { useEffect, useRef } from "react";
import { timeAgo } from "@/lib/utils";
import MessageItem from "./messageItem.component";

type ChatMessageType = {
    user: UserChatListItemType;
};

export default function ChatMessageContainer({ user }: ChatMessageType) {
    const { partner_name, last_active_at } = user;

    const chatBottom = useRef(null);
    const msg = [
        1, 1, 1, 2, 2, 1, 2, 1, 2, 2, 2, 1, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1,
    ].slice(0, 5);

    useEffect(() => {
        if (chatBottom) {
            chatBottom.current.scrollIntoView();
        }
    }, [chatBottom, user]);
    return (
        <div className="bg-mainDarkBg p-2 flex-1 ">
            <section className="flex flex-col gap-2 h-full">
                <div>
                    <h1 className="text-xl font-semibold text-white">
                        {partner_name}
                    </h1>
                    <p className="text-sm text-gray-600">
                        {timeAgo(last_active_at)}
                    </p>
                </div>
                <section className="chatting-box h-[100px] p-2  flex-grow flex flex-col overflow-y-auto">
                    {msg.map((item, index) => {
                        return (
                            <MessageItem
                                key={`msg-${index}-key`}
                                msg={{
                                    content: `hello world-${index}`,
                                }}
                                mine={item === 2}
                            />
                        );
                    })}

                    <div
                        ref={chatBottom}
                        style={{
                            float: "left",
                            clear: "both",
                            scrollBehavior: "smooth",
                        }}
                    ></div>
                </section>
            </section>
        </div>
    );
}
