import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


let  initialState = JSON.parse(localStorage.getItem("userInfo"))

if(!initialState){
    initialState = {
        data: {},
        loading: true,
        success: false,
        refreshToken: "",
        accessToken: "",
        status:""
    }
}

const  registerUser = createAsyncThunk(
    "auth/register", 
    async (input) => {
        
        const url = "http://localhost:8001/api/v1/users/register"

        const formData = new FormData()
        
        formData.append('userName', input.userName)
        formData.append('fullName', input.fullName),
        formData.append('email', input.email)
        formData.append('password', input.password)
        formData.append('avatar', input.avatar)
        formData.append('coverImage', input.coverImage)

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            })
        
            const {data, message} = await response.json() 
            
            const actionPayload = {
                data,
                message
            }
        
       return actionPayload
            
    }
)

const loginUser = createAsyncThunk(
    "/auth/login", 
    async (input) => {
        console.log()
        const url = "http://localhost:8001/api/v1/users/login"
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({userName: input.userName, password: input.password}),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
            credentials: "include"
          })

          const data = await response.json()
          console.log(data)
          return data
    }
)

const logoutUser = createAsyncThunk(
    "/auth/logout",
    async () => {
        const url = "http://localhost:8001/api/v1/users/logout"
        const response = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            credentials: "include"
        })

        const data = await response.json()
        return data
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        
        toggleSuccess: (state, action) => {
            state.success = false
            localStorage.setItem("userInfo", JSON.stringify({...state, success: false}))
            return state
        }
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            return state
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            console.log(action.payload)
            if(action.payload.data){
               state.success = true
               toast.success("Successfully registred")
            }
            else{
                toast.error(action.payload.message)
                state.success = false
            }
            return state
            
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            if(action.payload.data){
                state.data = action.payload.data
                state.refreshToken = action.payload.refreshToken
                state.accessToken = action.payload.accessToken
                state.success = true
                state.status = true

                const info = {
                    data: {},
                    success: state.success,
                    loading: false,
                    refreshToken: action.payload.refreshToken,
                    accessToken: action.payload.accessToken,
                    status: state.status
                }
                info.data = {
                    userName: action.payload.data.userName,
                    fullNmae: action.payload.data.fullName,
                    coverImage: action.payload.data.coverImage,
                    avatar: action.payload.data.avatar,
                    email: action.payload.data.email
                }
                console.log(info)
                localStorage.setItem("userInfo", JSON.stringify(info))
                toast.success("Successfully logged in")
            }
            else{
                state.success = false
                toast.error(action.payload.message)
            }
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            localStorage.removeItem("userInfo")
            state.data = {}
            state.success = false
            state.status = false
            state.loading = false
            state.refreshToken = false
            state.accessToken = false
            toast.success("Successfully Logged Out")
        })
       

    }
})

export const {toggleSuccess} = authSlice.actions
export {registerUser, loginUser, logoutUser}
export default authSlice.reducer
