import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import connectionsReducer from "./connectionSlice";
const appStore=configureStore({
    reducer:{
        user:userReducer,
        connections:connectionsReducer

    }
})

export default appStore;