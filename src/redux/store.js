import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./states/userState";

export default configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});
