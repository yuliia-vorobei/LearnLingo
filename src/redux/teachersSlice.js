import { createSlice } from "@reduxjs/toolkit";
import { fetchTeachersInfo } from "./operations";

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    items: [],
    lastKey: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    resetTeachers: (state) => {
      state.items = [];
      state.lastKey = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachersInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTeachersInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        // Get new teachers
        const newTeachers = action.payload.items;

        // Remove duplicates using a Set (assuming `avatar_url` is unique)
        const existingUrls = new Set(
          state.items.map((teacher) => teacher.avatar_url)
        );
        const uniqueTeachers = newTeachers.filter(
          (teacher) => !existingUrls.has(teacher.avatar_url)
        );

        // Append only unique teachers
        state.items = [...state.items, ...uniqueTeachers];
        state.lastKey = action.payload.lastKey;
      })

      .addCase(fetchTeachersInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTeachers } = teachersSlice.actions;
export default teachersSlice.reducer;
