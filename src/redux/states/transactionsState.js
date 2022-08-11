import { createSlice } from "@reduxjs/toolkit";

// services
import { getTransactionsService } from "../../services/transactionsAPI";

export const initialState = [];

export const transactionsSlice = createSlice({
    name: "categories",
    initialState: initialState,
    reducers: {
        createCategories: (state, action) => action.payload,
    },
});

export const getTransactions = (limit = undefined) => {
    return async (dispatch, getState) => {
        const state = getState();
        try {
            const response = await getTransactionsService(
                state.user.token,
                limit
            );
            dispatch(createCategories(response));
        } catch (err) {
            console.log(err);
        }
    };
};

export const { createCategories } = transactionsSlice.actions;
export default transactionsSlice.reducer;
