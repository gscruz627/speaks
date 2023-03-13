import {
  ChatBubbleOutline,
  ChatBubble,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  Reply,
  ThumbUp,
  ThumbDown,
  PersonAddOutlined,
  PersonRemoveOutlined,
  Star,
  Send,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  useTheme,
  Popover,
  MenuList,
  MenuItem,
  Avatar,
  InputBase,
} from "@mui/material";
import CompWrapper from "./CompWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setFollowings, setStory } from "../store";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useReducer } from "react";
import ProfilePicture from "./ProfilePicture";

const Story = ({
  storyId,
  storyUserId,
  username,
  userPicturePath,
  title,
  imagePath,
  content,
  agree,
  disagree,
  response,
  comments,
  topic,
  rating,
}) => {
  const [update, setUpdate] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const primaryLight = theme.palette.primary.light;
  const primaryDark = theme.palette.primary.dark;
  const main = theme.palette.neutral.main;
  const medium = theme.palette.neutral.medium;
  const light = theme.palette.neutral.light;
  const [ratingAnchor, setRatingAnchor] = useState(null);
  const [openComments, setOpenComments] = useState(false);
  const [comment, setComment] = useState("");
  const isAgree = Boolean(agree[user._id]);
  const agreePercentage = Math.round(
    (Object.keys(agree).length /
      (Object.keys(agree).length + Object.keys(disagree).length)) *
      100
  );
  const isDisagree = Boolean(disagree[user._id]);
  const hasRated = Boolean(rating[user._id]);
  const ratingAverage = (
    Object.values(rating).reduce((acc, curr) => acc + curr, 0) /
    Object.values(rating).length
  ).toFixed(2);
  const handleRating = async (value) => {
    const response = await fetch(
      `http://localhost:8080/story/${storyId}/rate`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Tkn_bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id, value: value }),
      }
    );
    const updatedStory = await response.json();
    dispatch(setStory({ story: updatedStory }));
  };

  const handleAgree = async () => {
    const response = await fetch(
      `http://localhost:8080/story/${storyId}/agree`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Tkn_bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      }
    );
    const updatedStory = await response.json();
    dispatch(setStory({ story: updatedStory }));
    setUpdate((prevUpdate) => !prevUpdate);
  };
  const handleDisagree = async () => {
    const response = await fetch(
      `http://localhost:8080/story/${storyId}/disagree`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Tkn_bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      }
    );
    const updatedStory = await response.json();
    dispatch(setStory({ story: updatedStory }));
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8080/story/${storyId}/newComment`,
      {
        method: "POST",
        headers: {
          Authorization: `Tkn_bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: comment, userId: user._id }),
      }
    );
    const updatedStory = await response.json();
    console.log(updatedStory);
    dispatch(setStory({ story: updatedStory }));
  };
  return (
    <CompWrapper
      margin="2rem 0"
      flexDirection="column"
      boxShadow={`0px 0px 15px ${light}`}
      padding="1.2rem"
      borderRadius="0.4rem"
    >
      <CompWrapper width="100%">
        <CompWrapper gap="1rem">
          <ProfilePicture
            size="35px"
            picturePath={userPicturePath}
            onClick={() => navigate(`/profile/${storyUserId}`)}
          />
          <Box>
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{ "&:hover": { color: medium, cursor: "pointer" } }}
            >
              {username}
            </Typography>
          </Box>
        </CompWrapper>
        {user && (
          <IconButton
            onClick={() => {}}
            sx={{ backgroundColor: primaryLight, padding: "0.6rem" }}
          >
            <Reply />
          </IconButton>
        )}
      </CompWrapper>
      <Typography
        variant="h4"
        textAlign="center"
        sx={{ marginTop: "1.5rem" }}
        textTransform="uppercase"
        fontWeight="bold"
      >
        {title}
      </Typography>
      <Typography sx={{ marginTop: "1rem", lineHeight: "2.5" }}>
        {content}
      </Typography>
      {imagePath && (
        <img
          width="100%"
          height="auto"
          alt="Story's Image"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={imagePath}
        />
      )}
      <CompWrapper mt="0.25rem">
        <CompWrapper gap="1rem" width="100%">
          {user && (
            <>
              <CompWrapper gap="0.3rem">
                <Typography variant="h3" color="primary">
                  {isNaN(ratingAverage) ? "--" : `[${ratingAverage}]`}
                </Typography>
                <IconButton
                  onClick={(e) => setRatingAnchor(e.currentTarget)}
                  disabled={hasRated ? true : false}
                >
                  <Star />
                  {hasRated && <Typography>{rating[user._id]}</Typography>}
                </IconButton>
                <Popover
                  open={Boolean(ratingAnchor)}
                  anchorEl={ratingAnchor}
                  onClose={() => setRatingAnchor(null)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <MenuList>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <MenuItem
                        key={rating}
                        onClick={() => handleRating(rating)}
                      >
                        {rating}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Popover>
              </CompWrapper>
              <Divider orientation="vertical" flexItem />
            </>
          )}

          <CompWrapper gap="0.3rem">
            <IconButton
              colordisabled={user ? false : true}
              onClick={() => handleAgree()}
            >
              <ThumbUp sx={{ color: isAgree ? "DodgerBlue" : "Inherit" }} />
            </IconButton>
            <Typography>
              {isNaN(agreePercentage) ? "--" : agreePercentage} %
            </Typography>
            <IconButton
              disabled={user ? false : true}
              onClick={() => handleDisagree()}
            >
              <ThumbDown sx={{ color: isDisagree ? "IndianRed" : "Inherit" }} />
            </IconButton>
            <Typography>
              {isNaN(100 - agreePercentage) ? "--" : 100 - agreePercentage} %
            </Typography>
            <Typography>
              {Object.keys(agree).length + Object.keys(disagree).length}{" "}
            </Typography>
          </CompWrapper>
          <Divider orientation="vertical" flexItem />
          <CompWrapper gap="0.3rem">
            <IconButton onClick={() => setOpenComments(!openComments)}>
              {openComments ? <ChatBubbleOutline /> : <ChatBubble />}
            </IconButton>
          </CompWrapper>
        </CompWrapper>
      </CompWrapper>
      {openComments && (
        <Box mt="0.5rem" mb="0.5rem">
          {/*
          {comments.map((comment) => (
            <>
              <Divider />
              <CompWrapper key={comment._id}>
                <ProfilePicture
                  picturePath={userPicturePath}
                  size="35px"
                  onClick={() => navigate(`user/${comment.userId}`)}
                  flexBasis="7%"
                />
                <Typography
                  margin="0.5rem 0"
                  paddingLeft="1rem"
                  flexBasis="93%"
                >
                  <Typography variant="h5" color="primary">
                    {comment.username}
                  </Typography>
                  {comment.text}
                </Typography>
              </CompWrapper>
            </>
          ))}
          */}
        </Box>
      )}
      {user && (
        <>
          <Divider />
          <CompWrapper width="100%" gap="0.3rem">
            <ProfilePicture
              picturePath={userPicturePath}
              size="35px"
              flexBasis="7%"
            />
            <form onSubmit={(e) => handleComment(e)} style={{ flexBasis: "93%"}}>
              <InputBase
                sx={{
                  border: `1px solid ${light}`,
                  borderRadius: "5px",
                  padding: "0.3rem",
                  margin: "0.3rem",
                  width: "85%"
                }}
                placeholder="Write a comment..."
                onChange={(e) => setComment(e.target.value)}
                required
                value={comment}
              />
              <IconButton color={main} type="submit">
                <Send />
              </IconButton>
            </form>
          </CompWrapper>
        </>
      )}
    </CompWrapper>
  );
};
export default Story;
