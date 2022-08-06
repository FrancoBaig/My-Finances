import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    name: "",
    email: "",
    token: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        createUser: (state, action) => action.payload,
        resetUser: () => initialState,
    },
});

export const { createUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
