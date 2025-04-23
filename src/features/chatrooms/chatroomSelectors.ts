import { createSelector } from "@reduxjs/toolkit";
import { ChatHistoryType, GroupedChatrooms, MessageStateType } from "../../types/chatroomsTypes";
import { RootState } from "../../store";

const getChatrooms = (state: RootState) => state.chatrooms.chatrooms;

//SELECT CHAT CONTEXT from redux store if relying on redux store for state management
export const selectChatContext = (chatroomId: string | undefined) => createSelector( //select's chat history of last 10 messages
    [getChatrooms],
    (chatrooms): ChatHistoryType[] => {
        if (!chatroomId) return [];
        return chatrooms[chatroomId]?.messages.slice(-10).map((messageItem: MessageStateType) => {
            const { role, message } = messageItem;
            return { role, parts: [{ text: message }] };
        })
    });

//UPDATE CHAT CONTEXT from react state, for when using firestore listener 
export const updateChatContext = (messages: MessageStateType[]) => {
    const chatContext = messages.slice(-9).map((messageItem) => {
        const { role, message } = messageItem;
        return { role, parts: [{ text: message }] };
    })
    return chatContext
}

//GET CHAT MESSAGES from redux store
export const getChatMessages = (chatroomId: string | undefined) => createSelector(
    [getChatrooms],
    (chatrooms) => {
        if (!chatroomId) return [];
        return chatrooms[chatroomId]?.messages
    }
)

//GET CHATROOM TITLES from redux store
export const getChatroomTitles = () => createSelector(
    [getChatrooms],
    (chatrooms) => {
        return Object.values(chatrooms).sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
            .reduce<GroupedChatrooms>((accu, chatroom) => {
                const { lastModified, id, title } = chatroom;
                const chatroomTitle = { lastModified, chatroomId: id, title }

                const today = new Date

                const getMidnightDate = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

                const lastModifiedDay = getMidnightDate(new Date(lastModified));
                const todayDay = getMidnightDate(today);

                // Calculate the difference in days
                const msPerDay = 1000 * 60 * 60 * 24;
                const diffInMs = todayDay.getTime() - lastModifiedDay.getTime();
                const diffInDays = diffInMs / msPerDay;

                if (diffInDays === 0) {
                    accu.today.push(chatroomTitle)
                } else if (diffInDays === 1) {
                    accu.yesterday.push(chatroomTitle)
                } else if (diffInDays <= 7) {
                    accu.prev7Days.push(chatroomTitle)
                } else {
                    accu.prev30Days.push(chatroomTitle)
                }

                return accu
            }, { today: [], yesterday: [], prev7Days: [], prev30Days: [] })
    }
)

export const getLoadingState = (id: string) => createSelector(
    [getChatrooms],
    (chatrooms) => {
        return chatrooms[id]?.loading
    }
)