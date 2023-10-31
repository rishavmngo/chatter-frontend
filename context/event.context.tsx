import { useContext } from "react";
import { WSStateContext } from "./websocket.context";
import { Eventc, Events } from "@/lib/event";
import { useActiveChat } from "./chats.context";

const { sendMessageEvent, getAllChatsEvent } = Events;
let wsSocket: WebSocket | null;

export default function useEventContext() {
    // wsSocket = useWS();

    wsSocket = useContext(WSStateContext);
    const { setChatListItem } = useActiveChat();

    function routeEvent(event: any) {
        switch (event.type) {
            case sendMessageEvent:
                break;
            case getAllChatsEvent:
                console.log("receiving", event.payload);
                setChatListItem(event.payload);
                break;
            default:
                console.log("event not implemented");
        }
    }

    function onMessage(event: MessageEvent) {
        const customData = JSON.parse(event.data);
        routeEvent(customData);
    }

    function onOpen(event: Event) {
        console.log("connection successful");
    }

    function onError(error: Event) {
        console.log("Error occured", error);
    }

    if (wsSocket) {
        wsSocket.onopen = onOpen;
        wsSocket.onmessage = onMessage;
        wsSocket.onerror = onError;
    }
}

export function sendMessage(type: string, payload?: any) {
    console.log("part 2");
    if (!wsSocket?.readyState) return;
    const event = new Eventc(type, payload);
    const request = JSON.stringify(event);
    console.log("part 3");
    wsSocket.send(request);
}
