import { GoogleGenAI } from "@google/genai";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PromptMessageType, ContentType, ResponseMessageType, ChatroomTitleType, GenerateChatroomTitleType } from "../../types/chatroomsTypes";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GENAI_API_KEY });

export const callGemini = async (content: ContentType) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: content,
    });
    return response.text;
}

export const promptMessage = createAsyncThunk(
    "chatrooms/promptMessage", async ({ content, chatroomId }: PromptMessageType):
    Promise<ResponseMessageType> => {
    const response = await callGemini(content);
    console.log("Response from Gemini:", response);
    return { response, chatroomId };
});

export const generateChatroomTitle = createAsyncThunk(
    "chatrooms/generateChatroomTitle", async ({ prompt, chatroomId }: GenerateChatroomTitleType):
    Promise<ChatroomTitleType> => {
    const title = await callGemini(`This prompt is to generate a chatroom title, respond with only a single title: ${prompt}.`);
    console.log("Title from Gemini:", title);
    return { title, chatroomId };
});