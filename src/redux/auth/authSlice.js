import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { loginUser, logout, refreshUser, registerUser } from "./operations";

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
    isRefreshing: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
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
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        state.isRefreshing = false;
      })
      .addCase(logout.fulfilled, () => {
        return {
          user: {
            name: null,
            email: null,
          },
          token: null,
          isLoggedIn: false,
          error: null,
          isLoading: false,
        };
      })

      .addMatcher(
        isAnyOf(registerUser.rejected, loginUser.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
          state.isLoggedIn = false;
        }
      )
      .addMatcher(
        isAnyOf(registerUser.pending, refreshUser.pending, loginUser.pending),
        (state) => {
          state.isLoading = true;
        }
      );
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
