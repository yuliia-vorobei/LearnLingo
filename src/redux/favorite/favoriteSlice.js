import { createSlice } from "@reduxjs/toolkit";
import { fetchTeachersInfo } from "../teachers/operations";
const getCurrentUser = () => localStorage.getItem("currentUser");

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    userId: getCurrentUser(),
    favoriteItems: (() => {
      const userId = getCurrentUser();
      const allFavorites = JSON.parse(
        localStorage.getItem("favoritesByUser") || "{}"
      );
      return allFavorites[userId] || [];
    })(),
  },
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
      const allFavorites = JSON.parse(
        localStorage.getItem("favoritesByUser") || "{}"
      );

      state.favoriteItems = allFavorites[state.userId] || [];
    },
    toggleFavorite(state, action) {
      const teacher = action.payload;
      const userId = state.userId;
      const allFavorites = JSON.parse(
        localStorage.getItem("favoritesByUser") || "{}"
      );
      const currentFavorites = allFavorites[userId] || [];

      const exists = state.favoriteItems.some(
        (item) => item.avatar_url === teacher.avatar_url
      );
      let updatedFavorites;

      if (exists) {
        updatedFavorites = currentFavorites.filter(
          (item) => item.avatar_url !== teacher.avatar_url
        );
      } else {
        updatedFavorites = [...currentFavorites, teacher];
      }
      state.favoriteItems = updatedFavorites;
      allFavorites[userId] = updatedFavorites;

      localStorage.setItem("favoritesByUser", JSON.stringify(allFavorites));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTeachersInfo.fulfilled, (state) => {
      state.favoriteItems = state.favoriteItems || [];
    });
  },
});

export const { toggleFavorite, setUserId } = favoriteSlice.actions;
export default favoriteSlice.reducer;
