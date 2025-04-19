import { Box } from "@mui/material";
import ChatBox from "./layout/ChatBox";
import Sidebar from "./layout/Sidebar";

function App() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                height: "100vh",
                p: 0,
                m: 0,
                border: '0px'
            }}
        >
            <Sidebar />
            <ChatBox />
        </Box>
    )
}

export default App;
