import { Box, IconButton, List, ListItemButton, ListSubheader, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getChatroomTitles } from "../features/chatrooms/chatroomSelectors";
import { ChatroomTitleType } from "../types/chatroomsTypes";
import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import EditSquareIcon from '@mui/icons-material/EditSquare';

function Sidebar() {
    const groupedChatrooms = useSelector(getChatroomTitles())

    return (
        <Box
            sx={{
                display: "flex",
                width: "270px",
                flexDirection: "column",
                backgroundColor: "#f9f9f9",
                paddingLeft: 1.5
            }}
        >
            <SidebarButtons />
            <List>
                {Object.entries(groupedChatrooms).map(([period, chatrooms], index) => (
                    chatrooms.length > 0 &&
                    <React.Fragment key={index}>
                        <ListSubheader sx={{ pl: 1, py: 0, m: 0, background: 'none' }}>{period}</ListSubheader>
                        {chatrooms.map((chatroom: ChatroomTitleType) => (
                            <ChatroomTitle title={chatroom.title || 'New Chat'} id={chatroom.chatroomId} key={chatroom.chatroomId} />
                        ))}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    )
}

function ChatroomTitle({ title, id }: { title: string, id: string }) {
    const navigate = useNavigate();
    return (
        <ListItemButton onClick={() => navigate(`/chat/${id}`)} sx={{
            borderRadius: '10px', p: 1, py: 0.75, mr: 1.75, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            WebkitMaskImage: 'linear-gradient(to right, black 80%, transparent)',
            maskImage: 'linear-gradient(to right, black 80%, transparent)',
        }}>
            <Typography variant="body2" sx={{ textWrap: 'nowrap' }}>{title}</Typography>
        </ListItemButton>
    )
}

function SidebarButtons() {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5, mr: 1.5 }}>
            <IconButton><MenuIcon /></IconButton>
            <Box sx={{ display: 'flex', }}>
                <IconButton><SearchIcon /></IconButton>
                <IconButton onClick={() => navigate('/')}><EditSquareIcon /></IconButton>
            </Box>
        </Box>
    )
}

export default Sidebar;