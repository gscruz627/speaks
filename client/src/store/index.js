import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "light",
    user: null,
    token: null,
    posts: [],
    comments: [],
}

export const authSlice = createSlice( {
    name: "auth",
    initialState, 
    reducer: {
        setTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light"
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setComments: (state, action) => {
            state.comments = action.payload.comments;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map( (post) => {
                if(post._id === action.payload.post._id) {
                    return action.payload.post;
                } else {
                    return post;
                }
            });
            state.posts = updatedPosts;
        },
        setComment: (state, action) => {
            const updatedComments = state.comments.map( (comment) => {
                if(comment._id === action.payload.comment._id) {
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
        }
    }
});

export const { setMode, setComment, setComments, setFollowers, setFollowings, setLogin, setLogout, setPost, setPosts} = authSlice.actions;
export default authSlice.reducer;