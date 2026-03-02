import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import connectionsReducer from "./connectionSlice";
import requestReducer from "./requestSlice";
const appStore=configureStore({
    reducer:{
        user:userReducer,
        connections:connectionsReducer,
        requests:requestReducer

    }
})

export default appStore;