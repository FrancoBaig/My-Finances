import { createSlice } from "@reduxjs/toolkit";
import {
    getCategoriesService,
    postCategoryService,
} from "../../services/categoriesAPI";

export const initialState = {
    incomes: [],
    expenses: [],
};

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: initialState,
    reducers: {
        createCategories: (state, action) => action.payload,
        setCategory: (state, action) => [...state, action.payload],
    },
});

export const getCategories = (month, year) => {
    return async (dispatch, getState) => {
        const state = getState();
        try {
            const response = await getCategoriesService(
                month,
                year,
                state.user.token
            );
            dispatch(createCategories(response.data));
        } catch (err) {
            console.log(err);
        }
    };
};

export const postCategory = (data) => {
    return async (dispatch, getState) => {
        const state = getState();
        try {
            const result = await postCategoryService(data, state.user.token);
            dispatch(setCategory({ id: result.id, ...data }));
        } catch (err) {
            console.log(err);
        }
    };
};

export const { createCategories, setCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
