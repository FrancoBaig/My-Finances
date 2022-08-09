import { createSlice } from "@reduxjs/toolkit";

export const initialState = [];

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: initialState,
    reducers: {
        createCategories: (state, action) => action.payload,
    },
});

export const { createCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
