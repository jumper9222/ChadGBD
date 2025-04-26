import { Box } from "@mui/material";
import Sidebar from "../layout/Sidebar";
import ChatBox from "../layout/ChatBox";
import { expand, flexColumn, flexRow, fullscreen } from "../styling/styling";
import { useContext } from "react";
import { SidebarContext } from "../components/SidebarContext";

export default function ChatPage() {
    const { isSidebarOpen } = useContext(SidebarContext)

    const sidebarStyle = {
        ...flexRow,
        position: { xs: 'absolute', md: 'relative' },
        zIndex: { xs: 1200, md: 'auto' },
        height: { xs: '100vh', md: '100%' },
        width: { xs: '270px', md: isSidebarOpen ? '270px' : '0' },
        transform: {
            xs: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
            md: isSidebarOpen ? 'translateX(0)' : 'translateX(-270px)',
        },
        transition: 'transform 0.3s ease-in-out',
    };


    return (
        <Box sx={{ ...flexRow, ...fullscreen }}>
            <Box sx={sidebarStyle}>
                <Sidebar />
            </Box>
            <Box sx={{ ...expand, ...flexColumn, flex: 1 }}>
                <ChatBox />
            </Box>
        </Box>
    )
}