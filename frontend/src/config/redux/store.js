/*

STEPS FOR STORE Management

>Submit Action
>Handle action in it's reducer
?Register Here-->reducer

*/
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import postReducer from "./reducer/postReducer";





export const store = configureStore({
    reducer:{
        auth: authReducer,
        posts: postReducer
        

    }
})