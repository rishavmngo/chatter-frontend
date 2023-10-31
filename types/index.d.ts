type UserChatListItemType = {
    chat_id: number;
    created_at: string;
    last_active_at: string;
    partner_name: string;
    partner_uid: number;
};

type ChatsItemContextType = {
    chatListItem: UserChatListItemType[];
    setChatListItem: React.Dispatch<
        React.SetStateAction<UserChatListItemType[]>
    >;
    activeChatItem: UserChatListItemType | null;
    setActiveChatItem: Dispatch<SetStateAction<UserChatListItemType | null>>;
};

type SocketContextType = {
    socket: WebSocket | null;
    setSocket: Dispatch<SetStateAction<WebSocket | null>>;
    onMessage: WebSocket["onmessage"] | null;
    setOnMessage: Dispatch<
        SetStateAction<((this: WebSocket, ev: MessageEvent<any>) => any) | null>
    >;
    onError: WebSocket["onerror"] | null;
    onOpen: WebSocket["onopen"] | null;

    setOnError: Dispatch<
        SetStateAction<((this: WebSocket, ev: Event<any>) => any) | null>
    >;

    setOnOpen: Dispatch<
        SetStateAction<((this: WebSocket, ev: Event<any>) => any) | null>
    >;
    socketInitilizer: () => void;
};

type TLogginedUser = {
    id: string;
    username: string;
    created_at: string;
    last_active_at: string;
};
