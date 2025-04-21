import ChatBox from "./layout/ChatBox";
import Sidebar from "./layout/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/chat" element={<Sidebar />} >
                    <Route path="/chat" element={<ChatBox />} />
                    <Route path="/chat/:chatroomId" element={<ChatBox />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
