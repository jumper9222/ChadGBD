import { Avatar, Box, Button, Typography } from "@mui/material";

function ChatBoxTopBar() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'fixed',
                width: '100%',
                px: 3,
                py: 1,
                borderBottom: '1px black solid',
            }}
        >
            <Typography>ChadGBD</Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: 2
                }}
            >
                <Button>Temporary</Button>
                <Avatar />
            </Box>
        </Box>
    )
}

export default ChatBoxTopBar;