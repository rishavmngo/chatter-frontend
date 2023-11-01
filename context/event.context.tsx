import { useContext } from "react";
import { Eventc, Events } from "@/lib/event";
import { useActiveChat } from "./chats.context";
import { WSStateContext } from "./websocket.context";

const { sendMessageEvent, getAllChatsEvent, getAllMsgByChatID } = Events;
let wsSocket: WebSocket | null;
let wsReadyGlobal: boolean;

export default function useEventContext() {
    // wsSocket = useWS();
    const { setWSReady, wsInstance, WSReady } = useContext(WSStateContext);
    wsSocket = wsInstance;
    wsReadyGlobal = WSReady;
    // console.log(setWSReady, wsInstance);

    const { setChatListItem, setActiveChatMessages } = useActiveChat();

    function routeEvent(event: any) {
        switch (event.type) {
            case sendMessageEvent:
                break;
            case getAllChatsEvent:
                setChatListItem(event.payload);
                break;
            case getAllMsgByChatID:
                setActiveChatMessages(event.payload);
                break;
            default:
                console.log("event not implemented");
        }
    }

    function onMessage(event: MessageEvent) {
        const customData = JSON.parse(event.data);
        routeEvent(customData);
    }

    // function onOpen(event: Event) {
    //     setWSReady(true);
    //     console.log("connection successful");
    // }

    function onError(error: Event) {
        console.log("Error occured", error);
    }

    if (wsSocket) {
        // wsSocket.onopen = onOpen;
        wsSocket.onmessage = onMessage;
        wsSocket.onerror = onError;
    }
}

export function sendMessage(type: string, payload?: any) {
    if (!wsReadyGlobal) return;
    const event = new Eventc(type, payload);
    const request = JSON.stringify(event);
    wsSocket?.send(request);
}
