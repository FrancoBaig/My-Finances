import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./states/userState";
import { categoriesSlice } from "./states/categoriesState";
import { transactionsSlice } from "./states/transactionsState";

export default configureStore({
    reducer: {
        user: userSlice.reducer,
        categories: categoriesSlice.reducer,
        transactions: transactionsSlice.reducer,
    },
});
