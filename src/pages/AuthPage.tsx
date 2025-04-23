import { useLocation, useNavigate } from "react-router-dom"
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import AppleIcon from '@mui/icons-material/Apple';
import { useContext, useState } from "react";
import { loginWithEmailAndPassword, loginWithGoogle, signupWithEmailAndPassword } from "../features/auth/AuthActions";
import { AuthContext } from "../features/auth/AuthContext";

export default function AuthPage() {
    const route = useLocation().pathname;
    const navigate = useNavigate();
    console.log(route)
    const { user } = useContext(AuthContext)
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const ButtonSX = {
        width: '340px',
        height: '52px',
        padding: '0px 20px',
        display: 'flex',
        justifyContent: 'start',
        gap: 1
    }
    const flexColumn = {
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        alignItems: 'center'
    }

    const routeIncludesPassword = route.includes('/password')

    const loginTitle = routeIncludesPassword
        ? <>Enter your password</>
        : <>Welcome back</>

    const signupTitle = routeIncludesPassword
        ? <>Create an account</>
        : <>Create your account</>

    const loginMessage = routeIncludesPassword
        ? <a>Forgot password?</a>
        : <>Don't have an account? <a href="/signup">Sign up</a></>

    const signupMessage = <>Already have an account? <a href="/login">Login</a></>

    const navToPasswordPage = () => navigate(`${route}/password`)

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        if (route === '/login/password') {
            loginWithEmailAndPassword(email, password)
                .then(() => navigate('/'));
        } else if (route === '/signup/password') {
            signupWithEmailAndPassword(email, password)
                .then(() => navigate('/'));
        }
    }

    const handleContinue = !routeIncludesPassword && email
        ? navToPasswordPage
        : routeIncludesPassword && email && password
            ? handleAuth
            : () => { return }

    if (user) {
        navigate('/')
    } else
        return (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }} >
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>ChadGBD</Typography>
                <Box sx={{ ...flexColumn }}>
                    <Typography variant="h4">{route === '/login' ? loginTitle : signupTitle}</Typography>
                    <TextField
                        fullWidth
                        label="Email address"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    {routeIncludesPassword &&
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />}
                    <Button
                        sx={{ ...ButtonSX, justifyContent: 'center' }}
                        variant="contained"
                        onClick={handleContinue}
                    >Continue</Button>
                    <Typography sx={{ mb: 3 }}>{route === '/login' ? loginMessage : signupMessage}</Typography>
                </Box>
                <Divider textAlign="center">OR</Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 3 }}>
                    <Button variant="outlined" sx={ButtonSX} onClick={loginWithGoogle}><GoogleIcon />Continue with Google</Button>
                    <Button variant="outlined" sx={ButtonSX} disabled><MicrosoftIcon />Continue with Microsoft Account</Button>
                    <Button variant="outlined" sx={ButtonSX} disabled><AppleIcon />Continue with Apple</Button>
                    <Button variant="outlined" sx={ButtonSX} disabled><AppleIcon />Continue with Apple</Button>
                </Box>
                <Box sx={{ display: "flex", my: 5 }}>
                    <Typography><a href="/">Terms of Use</a> | <a href="/">Privacy Policy</a></Typography>
                </Box>
            </ Box>
        )
}