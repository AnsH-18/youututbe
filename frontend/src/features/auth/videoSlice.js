import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    video: null,
    empty: true,
    videoLiked: false
}

const getAllVideos = createAsyncThunk(
    "video/getAll", 
    async () => {
        const url = "http://localhost:8001/api/v1/video/get-all"
        const response = await fetch(url,  {
            method: 'GET',
            credentials: "include"
        })
        const data = await response.json()
        return data
    }
)

const getLikedVideosByUser = createAsyncThunk(
    "videos/getLikedVideos",
    async (userId) => {
        console.log("Reached")
        const url = `http://localhost:8001/api/v1/like/get-all`
        const response = await fetch(url, {
            method: 'GET',
            credentials: "include"
        })
        const data = await response.json()
        if(data.data[0]){
            return data.data[0].videos
        }
        else{
            return []
        }
    }
)

const fetchVideoById = createAsyncThunk(
    "video/fetchById",
    async (videoId) => {
        const baseUrl = "http://localhost:8001/api/v1/video/videos/:"
        const url = new URL(baseUrl)
        url.searchParams.set("videoId", videoId)
        const response = await fetch(url, {
            method: 'GET',
            credentials: "include"
        })
        const data = await response.json()
        console.log(data.data.isliked)
        return data
    }
)

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        makeVideoNull: (state, action) => {
            console.log("making videos null")
            state.data = []
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllVideos.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.empty = false
        })
        .addCase(getLikedVideosByUser.fulfilled, (state, action) => {
            state.data = action.payload
            state.empty = action.payload.length === 0 ? true : false
        })
        .addCase(fetchVideoById.fulfilled, (state, action) => {
            state.video = action.payload.data.video[0]
            state.videoLiked = action.payload.data.isliked
        })
    }
})

export {getAllVideos, getLikedVideosByUser, fetchVideoById}
export const {makeVideoNull} = videoSlice.actions
export default videoSlice.reducer