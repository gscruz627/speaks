import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  useTheme,
  useMediaQuery,
  Button,
  Alert,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../store";
import Dropzone from "react-dropzone";
import CompWrapper from "./CompWrapper";

const Form = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVer, setPasswordVer] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [picture, setPicture] = useState(null);

  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isWideScreen = useMediaQuery("(min-width:1000px)");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const resetForm = () => {
    setIsRegister(!isRegister);
    setUsername("");
    setPassword("");
    setPasswordVer("");
    setPicture(null);
    setEmail("");
    setIsEmailValid(true);
    setIsPasswordMatch(true);
    setIsPasswordValid(true);
  };
  const handleEmail = (e) => {
    if (
      /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)+$/.test(
        e.target.value
      )
    ) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    if (/^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(e.target.value)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
    setPassword(e.target.value);
  };

  const handlePasswordVerificationChange = (e) => {
    if (password === e.target.value) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
    setPasswordVer(e.target.value);
  };

  const register = async () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("picture", picture);
    formData.append("email", email);

    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      body: formData,
    });

    const user = await response.json();
    if (user) {
      setIsRegister(false);
    }
    resetForm();
  };

  const login = async () => {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type" : "application/json"},
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    const user = await response.json();
    if (user) {
      dispatch(setLogin({
        user: user.user,
        token: user.token
      }))
    };
    resetForm();
    navigate("/")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="grid"
        gap="30px"
        margin="auto auto"
        maxWidth="600px"
        textAlign="center"
        sx={{
          "& > div": { gridColumn: isWideScreen ? undefined : "span 4" },
        }}
      >
        <TextField
          label="Username: "
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ gridColumn: "span 2" }}
          required
        ></TextField>
        {isRegister ? (
          <>
            <TextField
              label="Email: "
              value={email}
              onChange={(e) => {
                handleEmail(e);
              }}
              sx={{ gridColumn: "span 2" }}
              color={isEmailValid ? "primary" : "error"}
              required
            ></TextField>
            {!isPasswordValid && (
              <Alert severity="error">
                Your password is not Complete - Make sure to include an
                uppercase letter, a number, and a symbol. Minimum length: 8
              </Alert>
            )}

            <TextField
              type="password"
              label="Password:"
              value={password}
              onChange={(e) => {
                handlePasswordChange(e);
              }}
              sx={{ gridColumn: "span 2" }}
              required
            ></TextField>
            {!isPasswordMatch && (
              <Alert severity="error">Passwords do not match</Alert>
            )}
            <TextField
              type="password"
              label="Confirm Password"
              value={passwordVer}
              onChange={(e) => {
                handlePasswordVerificationChange(e);
              }}
              sx={{ gridColumn: "span 2" }}
              required
            ></TextField>
            <Dropzone
              acceptedFiles=".jpg, .jpeg, .png, .bmp"
              multiple={false}
              onDrop={(droppedFile) => {
                setPicture(droppedFile[0]);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <Box
                  {...getRootProps()}
                  border={`2px solid ${palette.primary.main}`}
                  borderRadius="10px"
                  padding="1rem"
                  sx={{
                    gridColumn: "span 2",
                    "&:hover": { cursor: "pointer" },
                  }}
                  width="100%"
                >
                  <input {...getInputProps()} />
                  {picture ? (
                    <>
                    <CompWrapper>
                      <Typography> {picture.name} </Typography>
                      <EditOutlined />
                    </CompWrapper>
                    <CompWrapper>
                      <img src={URL.createObjectURL(picture)} style={{ textAlign: "center", margin: "1rem auto", maxWidth:"300px" }}/>
                    </CompWrapper>
                    </>
                  ) : (
                    <p> Upload an image (not required) </p>
                  )}
                </Box>
              )}
            </Dropzone>
          </>
        ) : (
          <TextField
            type="password"
            label="Password:"
            value={password}
            onChange={(e) => {
              handlePasswordChange(e);
            }}
            sx={{ gridColumn: "span 2" }}
            required
          ></TextField>
        )}
        <Box>
          <Button
            fullWidth
            margin="auto auto"
            type="submit"
            variant="fill"
            padding="1rem"
            sx={{
              backgroundColor: palette.primary.main,
            }}
            onClick={() => {
              isRegister ? register() : login();
            }}
          >
            {isRegister ? "REGISTER" : "LOGIN"}
          </Button>
        </Box>
        <Typography
          onClick={() => {
            resetForm();
          }}
          sx={{ cursor: "pointer" }}
        >
          {isRegister
            ? "Already have an account?"
            : "Don't have an account yet?"}
        </Typography>
      </Box>
    </form>
  );
};

export default Form;
