export interface ChatHistoryType {
    role: "model" | "user";
    parts: { text: string }[];
}

export type ContentType = string | ChatHistoryType[];

export interface PromptMessageType {
    content: ContentType;
    chatroomId: string;
    prompt: string;
}

export interface ResponseMessageType {
    response: string | undefined;
    chatroomId: string;
}

export interface GenerateChatroomTitleType {
    prompt: string;
    chatroomId: string;
}
export interface ChatroomTitleType {
    title: string | undefined;
    chatroomId: string;
}

// This interface is used to define the structure of a chatroom object in the Redux store.
export interface MessageStateType {
    role: "model" | "user";
    message: string;
    timestamp: Date
}

// This interface is used to define the structure of a chatroom object in the Redux store.
export interface ChatroomStateType {
    id: string;
    title: string | null;
    lastModified: Date;
    loading: boolean;
    messages: MessageStateType[];
}

