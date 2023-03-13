import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  user: null,
  token: null,
  posts: [],
  comments: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setStories: (state, action) => {
      state.stories = action.payload.stories;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setComments: (state, action) => {
      state.comments = action.payload.comments;
    },
    setStory: (state, action) => {
      const updatedStories = state.stories.map((story) => {
        if (story._id === action.payload.story._id) {
          return action.payload.story;
        }
        return story;
      });
      state.stories = updatedStories;
    },
    setComment: (state, action) => {
      const updatedComments = state.comments.map((comment) => {
        if (comment._id === action.payload.comment._id) {
          return action.payload.comment;
        } else {
          return comment;
        }
      });
      state.comments = updatedComments;
    },
    setFollowings: (state, action) => {
      state.user.followings = action.payload.followings;
    },
    setFollowers: (state, action) => {
      state.user.followers = action.payload.followers;
    },
  },
});

export const {
  setTheme,
  setComment,
  setComments,
  setFollowers,
  setFollowings,
  setLogin,
  setLogout,
  setStory,
  setStories,
} = authSlice.actions;
export default authSlice.reducer;
