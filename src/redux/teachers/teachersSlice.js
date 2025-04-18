import { createSlice } from "@reduxjs/toolkit";
import { fetchTeachersInfo } from "./operations";
import { logout } from "../auth/operations";

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    items: [],
    lastKey: null,
    isLoading: false,
    error: null,
    favorite: [],
  },
  reducers: {
    resetTeachers: (state) => {
      state.items = [];
      state.lastKey = null;
      state.error = null;
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
        if (newTeachers.length === 0 || !action.payload.lastKey) {
          state.lastKey = null; // No more items, set lastKey to null
        } else {
          state.lastKey = action.payload.lastKey; // Update lastKey if more items exist
        }
      })
      .addCase(logout.fulfilled, () => {
        return {
          items: [],
          lastKey: null,
          isLoading: false,
          error: null,
          favorite: [],
        };
      })
      .addCase(fetchTeachersInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTeachers } = teachersSlice.actions;
export default teachersSlice.reducer;
