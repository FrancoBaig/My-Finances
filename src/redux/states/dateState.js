import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const initialState = "";

export const dateSlice = createSlice({
    name: "date",
    initialState: initialState,
    reducers: {
        setDate: (state, action) => {
            const date = action.payload;
            return {
                month: moment(date).format("MM"),
                year: moment(date).format("YYYY"),
            };
        },
    },
});

export const { setDate } = dateSlice.actions;

export default dateSlice.reducer;
