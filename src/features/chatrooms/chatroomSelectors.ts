import { createSelector } from "@reduxjs/toolkit";
import { ChatHistoryType, MessageStateType } from "../../types/chatroomsTypes";
import { RootState } from "../../store";

const getChatrooms = (state: RootState) => state.chatrooms.chatrooms;

export const selectChatContext = (chatroomId: string | undefined) => createSelector( //select's chat history of last 10 messages
    [getChatrooms],
    (chatrooms): ChatHistoryType[] => {
        if (!chatroomId) return [];
        return chatrooms[chatroomId]?.messages.slice(-10).map((messageItem: MessageStateType) => {
            const { role, message } = messageItem;
            return { role, parts: [{ text: message }] };
        })
    });

export const getChatMessages = (chatroomId: string | undefined) => createSelector(
    [getChatrooms],
    (chatrooms) => {
        if (!chatroomId) return [];
        return chatrooms[chatroomId]?.messages
    }
)