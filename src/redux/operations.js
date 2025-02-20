import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";

axios.defaults.baseURL =
  "https://learnlingo-18ec5-default-rtdb.europe-west1.firebasedatabase.app";

export const fetchTeachersInfo = createAsyncThunk(
  "teachers/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/.json`);
      console.log(response);
      return response.data;
    } catch (error) {
      //   error.status === 404 && toast.error("Not found");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const getTruckDetails = createAsyncThunk(
//   "transport/fetchTruckDetail",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.get(`/campers/${id}`);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
