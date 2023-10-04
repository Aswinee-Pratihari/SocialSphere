import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.status = true;
    },
    logOut: (state) => {
      state.user = null;
      state.status = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logOut } = authSlice.actions;

export default authSlice.reducer;
