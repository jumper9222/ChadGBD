import { GoogleGenAI } from "@google/genai";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PromptMessageType, ContentType, ResponseMessageType, ChatroomTitleType, GenerateChatroomTitleType, MessageStateType, DBChatroomType, CreateChatroomArgs, ChatroomStateType } from "../../types/chatroomsTypes";
import { db } from "../../firebase";
import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GENAI_API_KEY });

//HELPER FUNCTION to call Gemini API
export const callGemini = async (content: ContentType) => {
    console.log('attempting to call gemini')
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: content,
    });
    return response.text;
}

//PROMPT MESSAGES
export const promptMessage = createAsyncThunk(
    "chatrooms/promptMessage", async ({ content, chatroomId }: PromptMessageType):
    Promise<ResponseMessageType> => {
    console.log('attempting to call gemini')
    const response = await callGemini(content);
    console.log("Response from Gemini:", response);
    return { response, chatroomId };
});

//GENERATE CHATROOM TITLES 
export const generateChatroomTitle = createAsyncThunk(
    "chatrooms/generateChatroomTitle", async ({ prompt, chatroomId }: GenerateChatroomTitleType):
    Promise<ChatroomTitleType> => {
    const title = await callGemini(`This prompt is to generate a chatroom title, respond with only a single title: ${prompt}.`);
    console.log("Title from Gemini:", title);
    return { title, chatroomId };
});

//CREATE NEW CHATROOM in firestore db
export const createChatroomInDb = async ({ chatroomId, title, uid }: CreateChatroomArgs) => {
    const chatroomRef = doc(db, 'chatrooms', chatroomId)
    const chatroomObject: DBChatroomType = {
        id: chatroomId,
        title,
        uid,
        lastModified: new Date(),
    }
    await setDoc(chatroomRef, chatroomObject)
}

//UPLOAD MESSAGES to firestore
export const uploadMessageToDb = async (message: MessageStateType, chatroomId: string) => {
    const messageRef = collection(db, `chatrooms/${chatroomId}/messages`);
    await addDoc(messageRef, message)
}

//FETCH CHATROOMS from Firestore DB and set them in redux state
export const fetchChatroomsByUserId = createAsyncThunk(
    "chatrooms/fetchChatroomsByUserId", async (uid: string) => {
        const chatroomsRef = collection(db, 'chatrooms') //Create ref to chatroom collection
        const q = query(chatroomsRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        //Refactor chatroom docs from DB to set in redux state
        const chatroomsObj = querySnapshot.docs.reduce((chatrooms, chatroom) => {
            const { id, lastModified, ...rest } = chatroom.data()
            const messages: MessageStateType[] = [];
            chatrooms[id] = {
                id,
                loading: false,
                lastModified: new Date(lastModified.seconds * 1000 + lastModified.nanoseconds / 1e6),
                messages,
                ...rest
            } as ChatroomStateType
            return chatrooms
        }, {} as Record<string, ChatroomStateType>)

        return chatroomsObj
    }
)

//TODO: Create setMessagesToChatroom thunk to store messages in redux