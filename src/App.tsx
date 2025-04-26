import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";
import RequireAuth from "./components/RequireAuth";
import SidebarContextProvider from "./components/SibebarContextProvider";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RequireAuth />}>
                    <Route path="/" element={
                        <SidebarContextProvider>
                            <ChatPage />
                        </SidebarContextProvider>
                    } />
                    <Route path="/chat/:chatroomId" element={
                        <SidebarContextProvider>
                            <ChatPage />
                        </SidebarContextProvider>
                    } />
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
