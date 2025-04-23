import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";
import RequireAuth from "./components/RequireAuth";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RequireAuth />}>
                    <Route path="/" element={<ChatPage />} />
                    <Route path="/chat/:chatroomId" element={<ChatPage />} />
                </Route>
                <Route path="/login" element={<AuthPage />} >
                    <Route path="/login/password" element={<AuthPage />} />
                </Route>
                <Route path="/signup" element={<AuthPage />} >
                    <Route path="/signup/password" element={<AuthPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
