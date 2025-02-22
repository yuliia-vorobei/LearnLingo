import { createSlice } from "@reduxjs/toolkit";
import { fetchTeachersInfo } from "./operations";

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachersInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTeachersInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchTeachersInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default teachersSlice.reducer;
