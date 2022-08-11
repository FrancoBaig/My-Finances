import { createSlice } from "@reduxjs/toolkit";

// services
import { getTransactionsService } from "../../services/transactionsAPI";
import { postTransactionService } from "../../services/transactionsAPI";

export const initialState = [];

export const transactionsSlice = createSlice({
    name: "transaction",
    initialState: initialState,
    reducers: {
        createTransactions: (state, action) => action.payload,
        setTransaction: (state, action) => [...state, action.payload],
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
            dispatch(createTransactions(response));
        } catch (err) {
            console.log(err);
        }
    };
};

export const postTransaction = (data) => {
    return async (dispatch, getState) => {
        const state = getState();
        try {
            const result = await postTransactionService(data, state.user.token);
            dispatch(setTransaction({ id: result.transactionId, ...data }));
        } catch (err) {
            console.log(err);
        }
    };
};

export const { createTransactions, setTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
