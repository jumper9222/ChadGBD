import { Avatar, Box, Button, Typography } from "@mui/material";

function ChatBoxTopBar() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '60px',
                px: 3,
                py: 1,
                backgroundColor: '#f1f1f1',
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