import { createSlice } from "@reduxjs/toolkit";
import {
    getCategoriesService,
    postCategoryService,
} from "../../services/categoriesAPI";

export const initialState = {
    initial: 0,
    incomes: [],
    expenses: [],
};

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: initialState,
    reducers: {
        createCategories: (state, action) => action.payload,
        setCategory: (state, action) => {
            const category = action.payload;
            const section =
                category.category_type === 1 ? "incomes" : "expenses";

            return {
                ...state,
                [section]: [...state[section], category],
            };
        },
        updateCategoryValue: (state, action) => {
            const data = action.payload;

            const section = data.isIncome ? "incomes" : "expenses";

            const index = state[section].findIndex((el) => el.id === data.id);

            const newCategories = [...state[section]];

            newCategories[index] = {
                ...newCategories[index],
                value: newCategories[index].value + data.amount,
            };

            return {
                ...state,
                [section]: newCategories,
            };
        },
        updateInitial: (state, action) => {
            const { amount } = action.payload;

            return {
                ...state,
                initial: state.initial + amount,
            };
        },
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

export const {
    createCategories,
    setCategory,
    updateCategoryValue,
    updateInitial,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
