export const Events = {
    sendMessageEvent: "sendMessage",
    getAllChatsEvent: "getAllChats",
    getAllMsgByChatID: "getAllMsgByChatId",
    sendMessagePChatEvent: "sendMessagePChat",
};

export class Eventc {
    type: string;
    payload: any;
    constructor(type: string, payload: any) {
        this.type = type;
        this.payload = payload;
    }
}
