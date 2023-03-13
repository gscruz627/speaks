import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  InputAdornment,
  Menu,
  Button,
} from "@mui/material";
import {
  Search,
  DarkMode,
  LightMode,
  Help,
  Close,
  Logout,
  Settings,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { setTheme, setLogout } from "../store";
import CompWrapper from "./CompWrapper";
import ProfilePicture from "./ProfilePicture";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let theme = useTheme();
  const user = useSelector((state) => state.user);
  const isWideScreen = useMediaQuery("(min-width: 1000px)");
  const neutralLight = theme.palette.neutral.main;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primary = theme.palette.primary.main;
  const primaryDark = theme.palette.primary.dark;
  const light = theme.palette.neutral.light;
  const [anchor, setAnchor] = useState(null);
  const [isDropdown, setIsDropdown] = useState(false);

  return (
    <CompWrapper padding="1rem 6%" backgroundColor={primary}>
      <CompWrapper gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 1.5rem, 2rem)"
          color={dark}
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              color: neutralLight,
              cursor: "pointer",
            },
          }}
        >
          Zpeaks
        </Typography>
      </CompWrapper>
      {isWideScreen && (
        <CompWrapper
          fontSize="26px"
          backgroundColor={primaryDark}
          borderRadius="4px"
          gap="3rem"
          padding="0.1rem 1.5rem"
          width="25rem"
        >
          <InputBase
            placeholder="Search..."
            sx={{ color: light }}
            startAdornment={
              <InputAdornment position="start">
                <Search color="primary" />
              </InputAdornment>
            }
          ></InputBase>
        </CompWrapper>
      )}

      {isWideScreen ? (
        <CompWrapper gap="2rem">
          <IconButton onClick={() => dispatch(setTheme())}>
            {theme.palette.mode === "dark" ? (
              <LightMode sx={{ fontSize: "26px" }}></LightMode>
            ) : (
              <DarkMode sx={{ fontSize: "26px" }}></DarkMode>
            )}
          </IconButton>
          {user ? (
            <>
              <ProfilePicture size="35px" picturePath={user.userPicturePath}/>
              <IconButton onClick={(event) => setAnchor(event.currentTarget)}>
                <Settings />
              </IconButton>
              <Menu
                anchorEl={anchor}
                open={Boolean(anchor)}
                onClose={() => {
                  setAnchor(null);
                }}
              >
                <MenuItem onClick={() => {}}>
                  {" "}
                  <Settings /> &nbsp; &nbsp; Settings
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(setLogout());
                  }}
                >
                  {" "}
                  <Logout /> &nbsp; &nbsp; Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button variant="text" sx={{ color: dark }} size="large" onClick={() => navigate("/login")}>
                Log In
              </Button>
              <Button variant="text" sx={{ color: dark }} size="large" onClick={ () => navigate("/login")}>
                Sign Up
              </Button>
            </>
          )}
        </CompWrapper>
      ) : (
        <IconButton onClick={() => setIsDropdown(!isDropdown)}>
          <MenuIcon sx={{ fontSize: "36px" }} />
        </IconButton>
      )}
      {!isWideScreen && isDropdown && (
        <Box
          position="fixed"
          right="0"
          top="0"
          height="auto"
          zIndex="10"
          width="300px"
          backgroundColor={background}
        >
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setIsDropdown(!isDropdown)}>
              <Close sx={{ fontSize: "36px", marginLeft: "auto" }} />
            </IconButton>
          </Box>
          <CompWrapper flexDirection="column" justifyContent="flex-start" gap="3rem">
            <Box display="flex" textAlign="center" alignItems="center">
              <IconButton onClick={() => dispatch(setTheme())}>
                {theme.palette.mode === "dark" ? (
                  <LightMode sx={{ fontSize: "36px" }}></LightMode>
                ) : (
                  <DarkMode sx={{ fontSize: "36px" }}></DarkMode>
                )}
              </IconButton>
              <Typography variant="h3"> &nbsp; &nbsp; Theme</Typography>
            </Box>
            {user ? (
              <>
                <img
                  src={`http://localhost:8080/public/assets/${user.userPicturePath}`}
                  style={{
                    cursor: "pointer",
                    borderRadius: "100%",
                    width: "30px",
                    height: "30px",
                  }}
                ></img>
                <Box display="flex" textAlign="center" alignItems="center">
                  <IconButton>
                    <Settings sx={{ fontSize: "36px" }}/>
                  </IconButton>
                  <Typography variant="h3"> &nbsp; &nbsp; Settings</Typography>
                </Box>
                <Box display="flex" textAlign="center" alignItems="center">
                  <IconButton>
                    <Logout sx={{ fontSize: "36px" }}/>
                  </IconButton>
                  <Typography variant="h3"> &nbsp; &nbsp; Logout</Typography>
                </Box>
              </>
            ) : (
              <>
                <Button variant="text" sx={{ color: dark, fontSize:"24px" }}>
                  Log In
                </Button>
                <Button variant="text" sx={{ color: dark, fontSize:"24px" }}>
                  Sign Up
                </Button>
              </>
            )}
          </CompWrapper>
        </Box>
      )}
    </CompWrapper>
  );
};

export default Navbar;
