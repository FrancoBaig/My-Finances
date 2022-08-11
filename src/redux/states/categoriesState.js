import { createSlice } from "@reduxjs/toolkit";
import { getCategoriesService } from "../../services/categoriesAPI";

export const initialState = [];

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: initialState,
    reducers: {
        createCategories: (state, action) => action.payload,
    },
});

export const getCategories = () => {
    return async (dispatch, getState) => {
        const state = getState();
        try {
            const response = await getCategoriesService(state.user.token);
            dispatch(createCategories(response.data));
        } catch (err) {
            console.log(err);
        }
    };
};

export const { createCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
