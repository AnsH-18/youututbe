import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
<<<<<<< HEAD
    empty: true
=======
    empty: true,
    status: null
>>>>>>> 5f9481b (made few changes)
}

const getChannelSubscribers = createAsyncThunk(
    "susbcriber/getChannelSubscriber", 
    async (userId) => {
        const baseUrl = 'http://localhost:8001/api/v1/subscriptions/channel-subscribers/:'
        const url = new URL(baseUrl)
        url.searchParams.set("channelId", userId)
        const response = await fetch(url, {
            method: 'GET',
            credentials: "include"
        })
        const data = await response.json()
       if(data.data[0]){
        return data.data[0].subscriberDetails
       }
       else{
        return []
       }
    }
)

<<<<<<< HEAD
=======
const toggleSubscription = createAsyncThunk(
    "subscriber/toggleSubscription",
    async (channelId) => {
        const baseUrl = 'http://localhost:8001/api/v1/subscriptions/toggle-subscription/:videoId:'
        const url = new URL(baseUrl)
        url.searchParams.set("channelId", channelId)
        const response = await fetch(url, {
            method: "PATCH",
            credentials: "include"
        })
        const data = await response.json()
        console.log(data)
        return data
    }
)

>>>>>>> 5f9481b (made few changes)

const subscribersSlice = createSlice({
    name: "subscriber",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(getChannelSubscribers.fulfilled, (state, action) => {
            state.data = action.payload
            state.empty = action.payload.length === 0 ? true : false
        })
<<<<<<< HEAD
=======
        .addCase(toggleSubscription.fulfilled, (state, action) => {

        })
>>>>>>> 5f9481b (made few changes)
    }
})


<<<<<<< HEAD
export {getChannelSubscribers}
=======
export {getChannelSubscribers, toggleSubscription}
>>>>>>> 5f9481b (made few changes)
export default subscribersSlice.reducer