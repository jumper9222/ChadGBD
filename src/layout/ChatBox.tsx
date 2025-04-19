import { Box, Container, OutlinedInput, Typography } from "@mui/material";
import { GoogleGenAI } from "@google/genai";
import { useState } from "react";
import ChatBoxTopBar from "./ChatBoxTopBar";

type Message = {
    sender: string;
    message: string;
    timestamp: Date
}

function ChatBox() {
    const [output, setOutput] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");

    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GENAI_API_KEY });

    async function main() {

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: input,
        });
        setOutput((prev): Message[] => [{ sendar: 'ai', message: response.text, timestamp: new Date() }, ...prev]);
    }

    return (
        <Box
            sx={{
                width: '100%',
            }}
        >
            <ChatBoxTopBar />
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    height: '100%',
                    px: 10,
                    justifyContent: output.length > 0 ? "start" : "center",
                    alignItems: 'center',
                    overflowY: 'auto',
                }}
            >
                <Box
                    sx={{
                        width: '700px',
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        What can I help you with?
                    </Typography>
                    <OutlinedInput
                        placeholder="Ask anything"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        sx={{
                            borderRadius: '20px',
                            padding: '10px 15px',
                            border: '0px',
                            marginTop: 'auto',
                        }}
                        fullWidth
                        multiline
                        maxRows={4}
                    />
                    <Container sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <button
                            style={{
                                padding: '10px 20px',
                                borderRadius: '20px',
                                border: 'none',
                                backgroundColor: '#1976d2',
                                color: '#fff',
                                cursor: 'pointer',
                            }}
                            onClick={async () => {
                                await main();
                                setInput("");
                            }}
                        >
                            Send
                        </button>
                    </Container>
                </Box>
                {output.length > 0 && (
                    output.map((msg, index) => (
                        <Container key={index} sx={{ mt: 2, p: 2, borderRadius: '10px', backgroundColor: '#f0f0f0' }}>
                            <Typography variant="body1">{msg.message}</Typography>
                        </Container>
                    )
                    ))}
            </Container>
        </Box>
    );
}

export default ChatBox;