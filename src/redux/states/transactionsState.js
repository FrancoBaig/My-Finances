import { createSlice } from "@reduxjs/toolkit";

// services
import {
    getTransactionsService,
    postTransactionService,
    updateTransactionService,
    deleteTransactionService,
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
        removeTransaction: (state, action) => {
            const id = action.payload;
            const filteredTransactions = state.filter((tran) => tran.id !== id);

            return [...filteredTransactions];
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

export const deleteTransaction = (id) => {
    return async (dispatch, getState) => {
        const state = getState();
        try {
            await deleteTransactionService(id, state.user.token);
            dispatch(removeTransaction(id));
        } catch (err) {
            console.log(err);
        }
    };
};

export const {
    createTransactions,
    setTransaction,
    updateTransactionValues,
    removeTransaction,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
