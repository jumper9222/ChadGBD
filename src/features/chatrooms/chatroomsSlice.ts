import { createSlice } from "@reduxjs/toolkit";
import { generateChatroomTitle, promptMessage } from "./chatroomActions";
import { ChatroomStateType } from "../../types/chatroomsTypes";

const chatrooms: Record<string, ChatroomStateType> = {};

const initialState = {
    chatrooms: chatrooms,
}

const chatroomSlice = createSlice({
    name: "chatrooms",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(promptMessage.pending, (state, action) => {
                const { prompt, chatroomId } = action.meta.arg;
                if (!state.chatrooms[chatroomId]) {
                    state.chatrooms[chatroomId] = {
                        id: chatroomId,
                        title: "New Chat",
                        lastModified: new Date(),
                        loading: false,
                        messages: [],
                    };
                }
                state.chatrooms[chatroomId].messages.push({
                    role: "user",
                    message: prompt,
                    timestamp: new Date()
                });
                state.chatrooms[chatroomId].loading = true;
            })
            .addCase(promptMessage.fulfilled, (state, action) => {
                const { chatroomId, response } = action.payload;
                const modifiedDate = new Date();
                state.chatrooms[chatroomId].loading = false;
                if (response) {
                    state.chatrooms[chatroomId].messages.push({
                        role: "model",
                        message: response,
                        timestamp: modifiedDate
                    });
                }
                state.chatrooms[chatroomId].lastModified = modifiedDate;
            })
            .addCase(promptMessage.rejected, (state, action) => {
                const { chatroomId } = action.meta.arg;
                state.chatrooms[chatroomId].loading = false;
            })
            .addCase(generateChatroomTitle.fulfilled, (state, action) => {
                const { chatroomId, title } = action.payload;
                if (title) {
                    state.chatrooms[chatroomId].title = title;
                }
            })
    }
})

export default chatroomSlice.reducer;