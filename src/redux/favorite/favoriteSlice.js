import { createSlice } from "@reduxjs/toolkit";
import { fetchTeachersInfo } from "../teachers/operations";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favoriteItems: JSON.parse(localStorage.getItem("favorites")) || [],
  },
  reducers: {
    toggleFavorite(state, action) {
      const teacher = action.payload;
      const exists = state.favoriteItems.some(
        (item) => item.avatar_url === teacher.avatar_url
      );

      if (exists) {
        state.favoriteItems = state.favoriteItems.filter(
          (item) => item.avatar_url !== teacher.avatar_url
        );
      } else {
        state.favoriteItems = [...state.favoriteItems, teacher];
      }
      localStorage.setItem("favorites", JSON.stringify(state.favoriteItems));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTeachersInfo.fulfilled, (state) => {
      state.favoriteItems = state.favoriteItems || [];
    });
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
