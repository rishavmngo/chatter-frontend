import React, { useEffect, useState } from "react";
import { timeAgo } from "@/lib/utils";
import { sendMessage } from "@/context/event.context";
import { Events } from "@/lib/event";
import { useActiveChat } from "@/context/chats.context";
import MessageBox from "./messagesBox.component";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

type ChatMessageType = {
    user: UserChatListItemType;
};

export default function ChatMessageContainer({ user }: ChatMessageType) {
    const { partner_name, last_active_at } = user;
    const [messageText, setMessageText] = useState("");

    const { activeChatMessages } = useActiveChat();
    const { data } = useSession();

    // const msg = [
    //     1, 1, 1, 2, 2, 1, 2, 1, 2, 2, 2, 1, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1,
    // ].slice(0, 5);
    useEffect(() => {
        sendMessage(Events.getAllMsgByChatID, {
            chat_id: user.chat_id,
        });
    }, [user]);

    const handleSubmit = () => {
        sendMessage(Events.sendMessagePChatEvent, {
            chat_id: user.chat_id,
            author_id: data.user.id,
            content: messageText,
        });
        setMessageText("");
    };

    return (
        <div className="bg-mainDarkBg p-2 flex-1 w-full">
            <section className="flex flex-col gap-2 h-full">
                <div>
                    <h1 className="text-xl font-semibold text-white">
                        {partner_name}
                    </h1>
                    <p className="text-sm text-gray-600">
                        {timeAgo(last_active_at)}
                    </p>
                </div>
                <MessageBox
                    messages={{
                        messagesArray: activeChatMessages,
                        partner_uid: user.partner_uid,
                    }}
                />
                <section className="bg-mainDarkBg h-10 w-full  flex  text-white items-center">
                    {/* <Textarea className="resize-none" /> */}
                    <textarea
                        placeholder="Write msg...."
                        className=" textareamsg resize-none rounded-md p-2  h-full border-none  outline-none flex-grow text-gray-800"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                    />
                    <Button onClick={handleSubmit}>Send</Button>
                </section>
            </section>
        </div>
    );
}
