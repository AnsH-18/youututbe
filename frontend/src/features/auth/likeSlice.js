import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false
}

const checkLikeStatus = createAsyncThunk(
    "like/checkLikeStatus", 
    async(input) => {
        console.log("reached like slice")
        const baseUrl = "http://localhost:8001/api/v1/like/checkLikeStatus/:"
        const url = new URL(baseUrl)
        url.searchParams.set("videoId", input.videoId)
        url.searchParams.set("userId", input.userId)
        const reponse = await fetch(url, {
            method: "PATCH",
            credentials: "include"
        })
        const data = await reponse.json()
        console.log(data.data)
        return data.data
    }
)

const toggleVideoLike = createAsyncThunk(
    "like/toggleVideoLike", 
    async (videoId) => {
        const baseUrl = "http://localhost:8001/api/v1/like/video/:"
        const url = new URL(baseUrl)
        url.searchParams.set("videoId",videoId)
        const reponse = await fetch(url, {
            method: "PATCH",
            credentials: "include"
        })
        const data = await reponse.json()
        console.log(data)
        return data.data
    }
)

const likeSlice = createSlice({
    name: "likeSlice",
    initialState,
    reducers: {
        makeNull: (state, action) => {
            state.status = false
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(checkLikeStatus.fulfilled, (state, action) => {
            state.status = action.payload
        })
        .addCase(toggleVideoLike.fulfilled, (state, action) => {
            state.status = action.payload
        })
    }
})

export {checkLikeStatus, toggleVideoLike}
export const {makeNull} = likeSlice.actions
export default likeSlice.reducer