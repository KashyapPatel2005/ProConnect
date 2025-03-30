import { createSlice } from "@reduxjs/toolkit";
import { getAboutUser, getAllUsers, getConnectionRequest, getMyConnectionRequests, loginUser, registerUser } from "../../action/authAction";


const initialState = {
    user: undefined,
    isError : false,
    isSuccess : false, 
    isLoading : false,
    loggedIn : false,
    message: "",
    isTokenThere: false,
    profileFetched: false,
    connections: [],
    connectionRequests: [],
    all_users: [],
    all_profiles_fetched: false
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        reset: ()=> initialState,
        handleLoginUser : (state)=>{
            state.message = "hello"
        },
        emptyMessage: (state)=>{
            state.message = ""
        },
        setTokenIsThere:(state)=>{
            state.isTokenThere = true
        },
        setTokenIsNotThere:(state)=>{
            state.isTokenThere = false
        }
    },
     
    extraReducers: (builder)=>{
        builder
        .addCase(loginUser.pending, (state)=>{
            state.isLoading = true
            state.message = "knocking the door.."
        })
        .addCase(loginUser.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.loggedIn = true
            state.message = "Login is Successful"
        })
        .addCase(loginUser.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(registerUser.pending, (state)=>{
            state.isLoading = true
            state.message = "Registering you .."
        })
        .addCase(registerUser.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.loggedIn = true
            state.message = {
                message:"Registration is Successful, please login",
            }
        })
        .addCase(registerUser.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getAboutUser.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isError = false
            state.profileFetched = true
            state.user = action.payload.profile
        })
        .addCase(getAllUsers.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isError = false
            state.all_users = action.payload.profiles
            state.all_profiles_fetched = true
        })
        .addCase(getConnectionRequest.fulfilled, (state,action) =>{
            state.connections = action.payload
        })
        .addCase(getConnectionRequest.rejected,(state,action)=>{
            state.message = action.payload
        })
        .addCase(getMyConnectionRequests.fulfilled, (state,action)=>{
            state.connectionRequest = action.payload
        })
        .addCase(getMyConnectionRequests.rejected, (state,action)=>{
            state.message = action.payload
        })
    }
})

export const {reset,emptyMessage,setTokenIsNotThere,setTokenIsThere} = authSlice.actions

export default authSlice.reducer