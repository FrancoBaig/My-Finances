import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./states/userState";
import { categoriesSlice } from "./states/categoriesState";

export default configureStore({
    reducer: {
        user: userSlice.reducer,
        categories: categoriesSlice.reducer,
    },
});
