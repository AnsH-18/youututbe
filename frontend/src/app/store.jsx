import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js"
import videoReducer from "../features/auth/videoSlice.js";
import subscriberReducer from "../features/auth/subscriberSlice.js";
import userReducer from "../features/auth/userSlice.js";
import commentReducer from "../features/auth/commentsSlice.js";
import likeReducer from "../features/auth/likeSlice.js";
<<<<<<< HEAD
=======
import playlistReducer from "../features/playlistSlice.js";
>>>>>>> 5f9481b (made few changes)

export const store = configureStore({
    reducer: {
        auth: authReducer,
        video: videoReducer,
        subscriber : subscriberReducer,
        user: userReducer,
        comment: commentReducer,
<<<<<<< HEAD
        like: likeReducer
=======
        like: likeReducer,
        playlist: playlistReducer
>>>>>>> 5f9481b (made few changes)
    }
})
