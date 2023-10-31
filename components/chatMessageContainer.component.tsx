import React from "react";
import { timeAgo } from "@/lib/utils";

type ChatMessageType = {
    user: UserChatListItemType;
};

export default function ChatMessageContainer({ user }: ChatMessageType) {
    const { partner_name, last_active_at } = user;
    return (
        <div className="bg-mainDarkBg p-2 flex-1">
            <section>
                <div>
                    <h1 className="text-xl font-semibold text-white">
                        {partner_name}
                    </h1>
                    <p className="text-sm text-gray-600">
                        {timeAgo(last_active_at)}
                    </p>
                </div>
            </section>
        </div>
    );
}
