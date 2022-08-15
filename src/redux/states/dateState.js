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
        increaseMonth: (state, action) => {
            const currentDate = moment(`${state.year}-${state.month}-01`);
            const date = moment(currentDate).add(1, "months");

            return {
                month: moment(date).format("MM"),
                year: moment(date).format("YYYY"),
            };
        },
        decreaseMonth: (state, action) => {
            const currentDate = moment(`${state.year}-${state.month}-01`);
            const date = moment(currentDate).subtract(1, "months");

            return {
                month: moment(date).format("MM"),
                year: moment(date).format("YYYY"),
            };
        },
    },
});

export const { setDate, increaseMonth, decreaseMonth } = dateSlice.actions;

export default dateSlice.reducer;
