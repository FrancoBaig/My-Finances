import { createSlice } from "@reduxjs/toolkit";

// services
import {
    getTransactionsService,
    postTransactionService,
    updateTransactionService,
} from "../../services/transactionsAPI";

export const initialState = [];

export const transactionsSlice = createSlice({
    name: "transaction",
    initialState: initialState,
    reducers: {
        createTransactions: (state, action) => action.payload,
        setTransaction: (state, action) => [action.payload, ...state],
        updateTransactionValues: (state, action) => {
            const data = action.payload;

            const index = state.findIndex((el) => el.id === data.id);

            const newTransactions = [...state];

            newTransactions[index] = {
                ...newTransactions[index],
                ...data,
            };

            return [...newTransactions];
        },
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

export const updateTransaction = (data) => {
    return async (dispatch, getState) => {
        const state = getState();
        try {
            await updateTransactionService(data, state.user.token);
            dispatch(updateTransactionValues(data));
        } catch (err) {
            console.log(err);
        }
    };
};

export const { createTransactions, setTransaction, updateTransactionValues } =
    transactionsSlice.actions;
export default transactionsSlice.reducer;
