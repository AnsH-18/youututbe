import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast"

const initialState = {
    playlists: [],
    playlist: {},
    empty: true,
    status: false
}

const getAllPlaylistOfAUser = createAsyncThunk(
    "playlist/get-all",
    async () => {
        console.log("reached playlist slice ")
        const baseurl = "http://localhost:8001/api/v1/playlist/get-all"
        const url = new URL(baseurl)
        const response = await fetch(url, {
            method: "GET",
            credentials: "include"
        })
        const data = await response.json()
        console.log(data.data)
        return data.data
    }
)

const addVideoToPlaylist = createAsyncThunk(
    "playlist/addVideo",
    async (input) => {
        console.log("reacched add video method")
        const baseurl = "http://localhost:8001/api/v1/playlist/add/:"
        const url = new URL(baseurl)
        url.searchParams.set("playlistId", input.playlistId)
        url.searchParams.set("videoId", input.videoId)
        console.log("23424")
        const response = await fetch(url, {
            method: "PATCH",
            credentials: "include"
        })
        const data = await response.json()
        console.log(data)
        return data
    }
)

const createPlayListCall = createAsyncThunk(
    "playlist/create",
    async (input) => {
        console.log("reached")
        const baseurl = "http://localhost:8001/api/v1/playlist/create/:"
        const url = new URL(baseurl)
        url.searchParams.set("name", input.name)
        url.searchParams.set("description", input.description)

        const response = await fetch(url, {
            method: "POST",
            credentials: "include"
        })
        const data = await response.json()
        console.log(data)
        return data
    }
)

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        makeDataNull: (state, action) => {
            console.log("making empty");
            state.playlist = {}
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllPlaylistOfAUser.fulfilled, (state, action) => {
            action.payload.length === 0 ? state.empty = true : state.empty = false
            state.playlists = action.payload
        })
        .addCase(addVideoToPlaylist.fulfilled, (state, action) => {
            action.payload.success ? toast.success(action.payload.message) : toast.error(action.payload.message)
            state.status = false
        })
        .addCase(createPlayListCall.fulfilled, (state, action) => {
            action.payload.success ? toast.success(action.payload.message) : toast.error(action.payload.message)
            state.status = true
            console.log(action.payload.data)
            state.playlist = action.payload.data
        })
    }
})



export  {getAllPlaylistOfAUser, addVideoToPlaylist,createPlayListCall}
export const {makeDataNull} = playlistSlice.actions
export default playlistSlice.reducer

