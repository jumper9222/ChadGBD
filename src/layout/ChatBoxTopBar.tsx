import { Avatar, Box, Button, Typography } from "@mui/material";

function ChatBoxTopBar() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '40px',
                px: 3,
                py: 1,
                backgroundColor: '#fff',
                borderBottom: '1.5px solid rgb(234, 234, 234)'
            }}
        >
            <Typography sx={{ fontWeight: 'bold', fontSize: '18px', color: '#5d5d5d' }}>ChadGBD</Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: 'center',
                    gap: 2
                }}
            >
                <Button>Temporary</Button>
                <Avatar sx={{ width: '32px', height: '32px' }} />
            </Box>
        </Box>
    )
}

export default ChatBoxTopBar;