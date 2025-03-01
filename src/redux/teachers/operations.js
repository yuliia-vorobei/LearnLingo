import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";

axios.defaults.baseURL =
  "https://learnlingo-18ec5-default-rtdb.europe-west1.firebasedatabase.app";

export const fetchTeachersInfo = createAsyncThunk(
  "teachers/fetchAll",
  async ({ limit = 4, startKey = null }, thunkAPI) => {
    try {
      let url = `/.json?orderBy="$key"&limitToFirst=${limit + 1}`; // Fetching extra teacher to prevent duplication

      if (startKey) {
        url += `&startAt="${startKey}"`;
      }

      const response = await axios.get(url);
      if (!response.data) return { items: [], lastKey: null };

      const teachers = response.data;
      const filteredKeys = Object.keys(teachers);
      if (startKey && filteredKeys[0] === startKey) {
        filteredKeys.shift(); // Remove the duplicate only if it matches startKey
      }

      const filteredItems = filteredKeys
        .map((key) => teachers[key])
        .filter((t) => t !== null);

      const lastKey =
        filteredKeys.length > 0 ? filteredKeys[filteredKeys.length - 1] : null;

      return { items: filteredItems, lastKey };
    } catch (error) {
      //   error.status === 404 && toast.error("Not found");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
