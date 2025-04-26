import { Avatar, Box, Button, ClickAwayListener, Divider, IconButton, Menu, MenuItem, MenuList, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../features/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../features/auth/authActions";
import { useDispatch } from "react-redux";
import { clearChatrooms } from "../features/chatrooms/chatroomsSlice";
import { SidebarContext } from "../components/SidebarContext";
import MenuIcon from '@mui/icons-material/Menu';
import { flexRow } from "../styling/styling";

function ChatBoxTopBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useContext(AuthContext);
    const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);

    const [openUserMenu, setOpenUserMenu] = useState<null | HTMLElement>(null)
    const open = Boolean(openUserMenu)

    const toggleOpenUserMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        setOpenUserMenu(e.currentTarget)
    }

    const handleClose = () => {
        setOpenUserMenu(null)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
                height: '40px',
                p: 1,
                pl: isSidebarOpen ? 3 : 2,
                backgroundColor: '#fff',
                borderBottom: '1.5px solid rgb(234, 234, 234)'
            }}
        >
            <Box sx={{ ...flexRow, gap: 2, alignItems: 'center' }}>
                {!isSidebarOpen && <IconButton onClick={toggleSidebar}><MenuIcon /></IconButton>}
                <Typography sx={{ fontWeight: 'bold', fontSize: '18px', color: '#5d5d5d' }}>ChadGBD</Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: 'center',
                    gap: 2
                }}
            >
                {user
                    ? <>
                        <Button>Temporary</Button>
                        <IconButton onClick={toggleOpenUserMenu}>
                            <Avatar sx={{ width: '32px', height: '32px' }} src={user.photoURL as string} />
                        </IconButton>
                        <Menu open={open} anchorEl={openUserMenu} onClose={handleClose}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList>
                                    <MenuItem>Explore GBDs</MenuItem>
                                    <MenuItem>Customize ChadGBD</MenuItem>
                                    <MenuItem>Help & FAQ</MenuItem>
                                    <MenuItem>Settings</MenuItem>
                                    <Divider />
                                    <MenuItem>Get ChatGBD search extension</MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => handleLogout()
                                        .then(() => navigate('/login'))
                                        .then(() => dispatch(clearChatrooms()))
                                    }>Log out</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Menu>
                    </>
                    : <>
                        <Button onClick={() => navigate('/login')}>Login</Button>
                        <Button onClick={() => navigate('/signup')}>Signup</Button>
                    </>
                }
            </Box>
        </Box>
    )
}

export default ChatBoxTopBar;