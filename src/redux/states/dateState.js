import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const initialState = "";

export const dateSlice = createSlice({
    name: "date",
    initialState: initialState,
    reducers: {
        setDate: (state, action) => moment(action.payload).format("MM-YYYY"),
    },
});

export const { setDate } = dateSlice.actions;

export default dateSlice.reducer;
