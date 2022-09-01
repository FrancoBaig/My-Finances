import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./states/userState";
import { dateSlice } from "./states/dateState";
import { categoriesSlice } from "./states/categoriesState";
import { transactionsSlice } from "./states/transactionsState";

const rootReducer = combineReducers({
    user: userSlice.reducer,
    categories: categoriesSlice.reducer,
    transactions: transactionsSlice.reducer,
    date: dateSlice.reducer,
});

export const setupStore = (preloadedState) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
};
