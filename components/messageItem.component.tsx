import React, { useEffect, useRef } from "react";
import "./style.css";
import clsx from "clsx";

type MessageItemPropsType = {
    msg: {
        content: string;
    };
    mine: boolean;
};
export default function MessageItem({ msg, mine }: MessageItemPropsType) {
    const { content } = msg;

    return (
        <section
            className={clsx(
                "bg-white w-fit max-w-[300px] p-2 rounded ",
                {
                    "msg-mine": mine,
                },
                {
                    "msg-other": !mine,
                }
            )}
        >
            {content}
        </section>
    );
}
