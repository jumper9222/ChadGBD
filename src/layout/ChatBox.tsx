import { useContext, useEffect, useRef, useState } from "react";
import { Box, IconButton, InputBase, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import ChatBoxTopBar from "./ChatBoxTopBar";
import { createChatroomInDb, generateChatroomTitle, promptMessage } from "../features/chatrooms/chatroomActions";
import { useNavigate, useParams } from "react-router-dom";
import { ChatHistoryType, ChatroomTitleType, ContentType, MessageStateType } from "../types/chatroomsTypes";
import { db } from "../firebase";
import { doc, collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { AppDispatch } from "../store";
import MessageBubble from "./MessageBubble";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { AuthContext } from "../features/auth/AuthContext";
import { getLoadingState, updateChatContext } from "../features/chatrooms/chatroomSelectors";
import { useSelector } from "react-redux";

function ChatBox() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const routePath = useParams()?.chatroomId
    const user = useContext(AuthContext)?.user;
    const loading = useSelector(getLoadingState(routePath as string))

    const [input, setInput] = useState<string>("");
    const [messages, setMessages] = useState<MessageStateType[]>([]);
    const [chatContext, setChatContext] = useState<ChatHistoryType[]>([]);

    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    //LISTENER: Firestore listener for chatroom messages
    useEffect(() => {
        const messageRef = collection(db, `chatrooms/${routePath}`, 'messages')
        const q = query(messageRef, orderBy("timestamp"))

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages: MessageStateType[] = [];

            querySnapshot.forEach((doc) => {
                console.log(doc)
                messages.push({ ...doc.data() } as MessageStateType)
            })

            setMessages(messages);
            console.log('message: ', messages)
        })
        return () => unsubscribe()
    }, [routePath])

    //SIDE EFFECT: Update chat context as new messages are added
    useEffect(() => {
        const newChatContext = updateChatContext(messages)
        setChatContext(newChatContext)
    }, [messages])

    //Handle submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let content: ContentType = input;
        let chatroomId = doc(collection(db, 'chatrooms')).id;

        //NEW CHATROOM: After prompting message, generate a title using initial prompt
        if (!routePath) {
            try {
                console.log('Calling generate chatroom title', content, chatroomId)
                const action = await dispatch(generateChatroomTitle({ prompt: input, chatroomId }))
                //After generating the title, upload to database
                console.log('chatroom title generated successfully')
                const { title } = action.payload as ChatroomTitleType;
                if (user) {
                    console.log('uploading chatroom to db')
                    const chatroomData = { chatroomId, title, uid: user?.uid }
                    createChatroomInDb(chatroomData)
                }
                navigate(`/chat/${chatroomId}`)
            } catch (error) {
                console.error("There was an error generating title: ", error)
            }
        }

        //EXISTING CHATROOM: Update content to array of chat history and set chatroomId to current chatroom id
        if (routePath) {
            content = [...chatContext, { role: "user", parts: [{ text: input }] }]
            chatroomId = routePath
        }

        //Prompt message using model (either string or array)
        try {
            await dispatch(promptMessage({ content, chatroomId, prompt: input }))
            console.log('message prompted successfully', content, chatroomId, input)
        } catch (error) {
            console.error("There was a problem generating the content: ", error)
        }

        setInput('');
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                height: '100vh',
                m: 0,
                p: 0
            }}
        >
            <ChatBoxTopBar />
            <Box
                className="chat-box"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'calc(100vh - 60px)',
                    width: '100%',
                    m: 0,
                    justifyContent: messages.length > 0 || loading ? "end" : "center",
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        overflowY: 'auto',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ width: { xs: '87%', lg: '60%' }, display: 'flex', flexDirection: 'column', maxWidth: '700px', pt: 2 }}>
                        {messages.length > 0 && (messages.map((msg, index) => (
                            <MessageBubble
                                key={index}
                                msg={msg}
                            />)))
                        }
                        {loading && <Typography sx={{
                            mb: 2,
                            background: 'linear-gradient(90deg, #ccc 25%, #e0e0e0 50%, #ccc 75%)',
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 1.5s infinite',
                            color: 'transparent',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            '@keyframes shimmer': {
                                '0%': { backgroundPosition: '-200% 0' },
                                '100%': { backgroundPosition: '200% 0' },
                            }
                        }}>Generating response</Typography>}
                        <div ref={bottomRef} />
                    </Box>
                </Box>

                <Box sx={{
                    width: { xs: '82%', md: '70%' },
                    maxWidth: '700px',
                }}>
                    {messages.length === 0 &&
                        <Typography variant="h4" gutterBottom>
                            What can I help you with?
                        </Typography>
                    }
                </Box>
                <Box
                    sx={{
                        backgroundColor: '#f4f4f4',
                        borderRadius: '30px',
                        width: { xs: '82%', lg: '70%' },
                        maxWidth: '700px',
                        pl: 2,
                        pr: 1,
                        py: 1,
                    }}
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <InputBase
                        placeholder="Ask anything"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        sx={{ px: 1.5, pt: 1, border: '0px', }}
                        fullWidth
                        multiline
                        maxRows={6}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, pr: 0.5, pb: 0.5 }}>
                        <IconButton
                            style={{
                                borderRadius: '20px',
                                border: 'none',
                                backgroundColor: '#1976d2',
                                color: '#fff',
                                cursor: 'pointer',
                                width: '35px',
                                height: '35px',
                            }}
                            disabled={input.trim() === ""}
                            type="submit"
                        >
                            <ArrowUpwardIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Typography variant="caption" sx={{ py: 0.75 }}>ChadGBD can make mistakes. Check important info.</Typography>
            </Box>
        </Box >
    );
}

export default ChatBox;