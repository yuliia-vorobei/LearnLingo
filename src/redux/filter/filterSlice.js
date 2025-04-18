import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    languages: "",
    levels: "",
    price_per_hour: "",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter(state, action) {
      state.data = { ...state.data, ...action.payload };
      // state.data = action.payload;
    },
  },
});

export const { changeFilter } = filterSlice.actions;
export default filterSlice.reducer;
