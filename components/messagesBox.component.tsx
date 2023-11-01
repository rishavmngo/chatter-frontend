import React, { useEffect, useRef } from "react";
import MessageItem from "./messageItem.component";

type MessageBoxType = {
    messages: {
        messagesArray: ActiveChatMessageType[];
        partner_uid: number;
    };
};

export default function MessageBox({ messages }: MessageBoxType) {
    const { messagesArray, partner_uid } = messages;

    const chatBottom = useRef(null);
    useEffect(() => {
        if (chatBottom) {
            chatBottom.current.scrollIntoView();
        }
    }, [chatBottom, messages]);
    return (
        <section className="chatting-box h-[100px] p-2  flex-grow flex flex-col overflow-y-auto">
            {messagesArray.map((item, index) => {
                return (
                    <MessageItem
                        key={`msg-${index}-key`}
                        msg={{
                            content: item.content,
                        }}
                        mine={item.author_id !== partner_uid}
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
    );
}
