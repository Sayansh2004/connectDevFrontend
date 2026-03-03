import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import connectionsReducer from "./connectionSlice";
import requestReducer from "./requestSlice";
import feedReducer from "./feedSlice";
const appStore=configureStore({
    reducer:{
        user:userReducer,
        connections:connectionsReducer,
        requests:requestReducer,
        feed:feedReducer

    }
})

export default appStore;