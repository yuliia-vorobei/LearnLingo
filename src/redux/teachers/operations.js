import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL =
  "https://learnlingo-18ec5-default-rtdb.europe-west1.firebasedatabase.app";

export const fetchTeachersInfo = createAsyncThunk(
  "teachers/fetchAll",
  async ({ limit = 4, startKey = null, filters = {} }, thunkAPI) => {
    try {
      const hasFilters =
        filters.languages || filters.levels || filters.price_per_hour;

      const fetchLimit = hasFilters ? 30 : limit + 1;

      let url = `/.json?orderBy="$key"&limitToFirst=${fetchLimit}`;

      if (startKey) {
        url += `&startAt="${startKey}"`;
      }

      const response = await axios.get(url);
      if (!response.data) return { items: [], lastKey: null };
      let teachers = Object.entries(response.data)
        .filter(([_, value]) => value !== null)
        .map(([key, value]) => ({
          id: key,
          ...value,
        }));

      if (startKey) {
        teachers.shift(); // removes the duplicate
      }

      teachers = teachers.filter((teacher) => {
        return (
          (!filters.languages ||
            teacher.languages?.includes(filters.languages)) &&
          (!filters.levels || teacher.levels?.includes(filters.levels)) &&
          (!filters.price_per_hour ||
            String(teacher.price_per_hour) <= String(filters.price_per_hour))
        );
      });

      const paginated = teachers.slice(0, limit);
      const lastKey = paginated.length
        ? paginated[paginated.length - 1].id
        : null;

      return { items: paginated, lastKey };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
