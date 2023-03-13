import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPosts } from "../store";
import { useTheme } from "@emotion/react";
import { Box, Typography, InputBase, Divider } from "@mui/material";
import { Image } from "@mui/icons-material";
import { useSelector } from "react-redux";
import CompWrapper from "./CompWrapper";

const UploadStory = () => {
  const user = useSelector((state) => state.user);
  const [picture, setPicture] = useState(null);
  const [post, setPost] = useState(null);
  return (
    <CompWrapper borderRadius="5px" boxShadow="0 0 10px lightgray" flexDirection="column" padding="1rem 6%">
      <Typography variant="h3"> New Story</Typography>
      <Divider variant="fullWidth" />
      <InputBase
        startAdornment={<img src={`localhost:8080/${user.userPicturePath}`} />}
        endAdornment={ <Image/> }
      />
    </CompWrapper>
  );
};

export default UploadStory;
