import CompWrapper from "../components/CompWrapper";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Navbar from "../components/Navbar";
import Form from "../components/Form";

const Login = () => {
    const theme = useTheme();
    const isWideScreen = useMediaQuery("(min-width: 1000px)");
    return (
        <>
        <Navbar/>
        <Box borderRadius="5px" borderColor="primary" width={ isWideScreen ? "auto" : "90%"} margin="auto auto">
            <Box maxWidth="600px" margin="auto auto" padding="2rem 6%" textAlign="center">
                <Typography fontWeight="bold" variant="h1">
                    Zpeaks
                </Typography>
            </Box>
            <Form />
        </Box>
        </>
    )
}

export default Login;