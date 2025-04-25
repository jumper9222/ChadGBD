import { createSlice } from "@reduxjs/toolkit";
import { fetchChatroomsByUserId, generateChatroomTitle, promptMessage, uploadMessageToDb } from "./chatroomActions";
import { ChatroomStateType, MessageStateType } from "../../types/chatroomsTypes";

const chatrooms: Record<string, ChatroomStateType> = {};

const initialState = {
    chatrooms: chatrooms,
}

const chatroomSlice = createSlice({
    name: "chatrooms",
    initialState: initialState,
    reducers: {
        clearChatrooms() {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            //PROMPT MESSAGE extra reducers
            .addCase(promptMessage.pending, (state, action) => {
                const { prompt, chatroomId } = action.meta.arg;

                const userPrompt: MessageStateType = {
                    role: "user",
                    message: prompt,
                    timestamp: new Date()
                }
                state.chatrooms[chatroomId].messages.push(userPrompt);
                state.chatrooms[chatroomId].loading = true;
                uploadMessageToDb(userPrompt, chatroomId);
            })
            .addCase(promptMessage.fulfilled, (state, action) => {
                const { chatroomId, response } = action.payload;
                const modifiedDate = new Date();
                state.chatrooms[chatroomId].loading = false;
                if (response) {
                    const modelResponse: MessageStateType = {
                        role: "model",
                        message: response,
                        timestamp: modifiedDate
                    }
                    state.chatrooms[chatroomId].messages.push(modelResponse);
                    uploadMessageToDb(modelResponse, chatroomId);
                }
                state.chatrooms[chatroomId].lastModified = modifiedDate;
            })
            .addCase(promptMessage.rejected, (state, action) => {
                const { chatroomId } = action.meta.arg;
                console.error('there was an issue prompting the message')
                state.chatrooms[chatroomId].loading = false;
            })
            //GENERATE CHATROOM TITLE extra reducers
            .addCase(generateChatroomTitle.pending, (state, action) => {
                const { chatroomId } = action.meta.arg;
                state.chatrooms[chatroomId] = {
                    id: chatroomId,
                    title: "New chat",
                    lastModified: new Date(),
                    loading: true,
                    messages: [],
                }
            })
            .addCase(generateChatroomTitle.fulfilled, (state, action) => {
                const { chatroomId, title } = action.payload;
                state.chatrooms[chatroomId].title = title;
                state.chatrooms[chatroomId].loading = false;
            })
            .addCase(generateChatroomTitle.rejected, (state, action) => {
                const { chatroomId } = action.meta.arg;
                console.error('there was an issue generating the chatroom title')
                state.chatrooms[chatroomId].loading = false;
            })
            //FETCH CHATROOMS extra reducers
            .addCase(fetchChatroomsByUserId.fulfilled, (state, action) => {
                state.chatrooms = action.payload;
                console.log("charooms: ", action.payload)
            })
    }
})

export const { clearChatrooms } = chatroomSlice.actions;
export default chatroomSlice.reducer;