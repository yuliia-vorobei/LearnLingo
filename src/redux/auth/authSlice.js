import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    error: null,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addMatcher(isAnyOf(registerUser.pending, loginUser.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        isAnyOf(registerUser.rejected, loginUser.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
          state.isLoggedIn = false;
        }
      );
  },
});

export default authSlice.reducer;
