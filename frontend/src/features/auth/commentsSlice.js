import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    data: [],
    comment: false,
    fetchedEmpty: true,
    totalCount: 0
}

const getCommentsOfVideo = createAsyncThunk(
    "comment/getCommentsOfVideo",
    async (input) => {
        console.log(input.page)
        const baseUrl = "http://localhost:8001/api/v1/comment/get-all/:"
        const url = new URL(baseUrl)
        url.searchParams.set("videoId", input.videoId)
        url.searchParams.set("page", input.page)
        const response = await fetch(url, {
            method: 'GET',
            credentials: "include"
        })
        const data = await response.json()
        console.log(data.data.totalCount[0].total_count)
        return data
    }
)

const addComment = createAsyncThunk(
    "comment/addComment",
    async (input) => {
        const baseUrl = "http://localhost:8001/api/v1/comment/add/:"
        const url = new URL(baseUrl)
        url.searchParams.set("videoId", input.videoId)
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({content: input.content}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            credentials: "include"
        })
        const data = await response.json()
        console.log(data.data[0])
        return data
    }
)

const commentSlice = createSlice({
    name:"comment",
    initialState,
    reducers: {
        makeCommentNull: (state, action) => {
            state.data = []
            state.totalCount = 0
            state.fetchedEmpty = true
            return state
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getCommentsOfVideo.fulfilled, (state, action) => {
          if(state.data.length === 0){
            state.data = action.payload.data.data
          }
          else{
            state.data.push(...action.payload.data.data)
          }
          state.fetchedEmpty = action.payload.data.data?.length === 0 ? true : false
          state.totalCount = action.payload.data.totalCount[0].total_count
        })
        .addCase(addComment.fulfilled, (state, action) => {
            state.data.unshift(action.payload.data[0])
            toast.success("Comment Added Successfully")
        })
    }
})

export {getCommentsOfVideo, addComment}
export const {makeCommentNull} = commentSlice.actions
export default commentSlice.reducer