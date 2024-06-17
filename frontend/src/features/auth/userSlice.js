import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    data: {}
}

const getChannelDetails = createAsyncThunk(
    "user/getChannelDetails",
    async (userName) => {
        const baseUrl = "http://localhost:8001/api/v1/users/get-channel-details"
        const url = new URL(baseUrl)
        url.searchParams.set("userName", userName)
        const response = await fetch(url, {
            method: 'GET',
            credentials: "include"
        })
        const data = await response.json()
        // console.log(data.data[0])
        return data.data
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducer: {
        makeDetailsnull: (state, action) => {
            state.data = {}
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getChannelDetails.fulfilled, (state, action) => {
            state.data = action.payload[0]
        })
    }
})

export {getChannelDetails}
export const {makeDetailsnull} = userSlice.actions
export default userSlice.reducer