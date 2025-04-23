import { Box } from "@mui/material";
import Sidebar from "../layout/Sidebar";
import ChatBox from "../layout/ChatBox";
import { expand, flexColumn, flexRow, fullscreen } from "../styling/styling";

export default function ChatPage() {
    return (
        <Box sx={{ ...flexRow, ...fullscreen, }}>
            <Box sx={{ ...flexRow, height: '100%', width: '270px', zIndex: 100 }}>
                <Sidebar />
            </Box>
            <Box sx={{ ...expand, ...flexColumn }}>
                <ChatBox />
            </Box>
        </Box>
    )
}