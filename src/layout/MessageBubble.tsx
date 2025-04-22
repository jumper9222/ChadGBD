import { Box, Typography } from "@mui/material";
import { MessageStateType } from "../types/chatroomsTypes";
import ReactMarkdown from "react-markdown";

export default function MessageBubble({ msg }: { msg: MessageStateType }) {
    const { role, message } = msg;
    return (
        <Box sx={{
            mb: 2,
            px: 2,
            width: role === 'user' ? '70%' : '100%',
            alignSelf: role === "user" ? 'flex-end' : 'flex-start',
            backgroundColor: role === 'user' ? '#f4f4f4' : 'none',
            borderRadius: '15px',
        }}>
            <Typography variant="body1">
                <ReactMarkdown>{message}</ReactMarkdown>
            </Typography>
        </Box>
    )
}