import { useState } from "react";
import { Box, IconButton, InputBase, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ChatBoxTopBar from "./ChatBoxTopBar";
import { generateChatroomTitle, promptMessage } from "../features/chatrooms/chatroomActions";
import { getChatMessages, selectChatContext } from "../features/chatrooms/chatroomSelectors";
import { useNavigate, useParams } from "react-router-dom";
import { ContentType } from "../types/chatroomsTypes";
import { db } from "../firebase";
import { doc, collection } from "firebase/firestore"
import { AppDispatch } from "../store";
import MessageBubble from "./MessageBubble";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function ChatBox() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const routePath = useParams()?.chatroomId

    const chatContext = useSelector(selectChatContext(routePath));
    const allMessages = useSelector(getChatMessages(routePath))
    console.log(allMessages)
    const [input, setInput] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let content: ContentType = input;
        let chatroomId = doc(collection(db, 'chatrooms')).id;

        if (routePath) {
            content = [...chatContext, { role: "user", parts: [{ text: input }] }]
            chatroomId = routePath
        }

        dispatch(promptMessage({ content, chatroomId, prompt: input }))
        if (!routePath) {
            dispatch(generateChatroomTitle({ prompt: input, chatroomId }))
            navigate(`/chat/${chatroomId}`)
        }
        setInput('');
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
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
                    justifyContent: allMessages.length > 0 ? "end" : "center",
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
                    <Box sx={{ width: '60%', display: 'flex', flexDirection: 'column', maxWidth: '700px' }}>
                        {allMessages.length > 0 && (allMessages.map((msg, index) => (
                            <MessageBubble
                                key={index}
                                msg={msg}
                            />)))
                        }
                    </Box>
                </Box>
                <Box sx={{
                    justifySelf: 'flex-end',
                    width: '70%',
                    maxWidth: '700px',
                }}>
                    {allMessages.length === 0 &&
                        <Typography variant="h4" gutterBottom>
                            What can I help you with?
                        </Typography>
                    }
                    <Box
                        sx={{
                            backgroundColor: '#f1f1f1',
                            borderRadius: '30px',
                            pl: 2,
                            pr: 1,
                            py: 1,
                        }}
                        component="form"
                    >
                        <InputBase
                            placeholder="Ask anything"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            sx={{
                                px: 1.5,
                                pt: 1,
                                border: '0px',
                            }}
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
                                onClick={handleSubmit}
                                disabled={input.trim() === ""}
                            >
                                <ArrowUpwardIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default ChatBox;