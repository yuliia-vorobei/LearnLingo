import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../database/firebaseConfig";
import { ref, set } from "firebase/database";
import toast from "react-hot-toast";
import { clearUser, setUser } from "./authSlice";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: formData.name });

      await set(ref(db, "users/" + user.uid), {
        name: formData.name,
        email: formData.email,
        createdAt: new Date().toISOString(),
      });

      return {
        user: { name: formData.name, email: formData.email },
        token: await user.getIdToken(),
      };
    } catch (error) {
      toast.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const name = user.displayName;

      return {
        user: { email: formData.email, name: name || "Anonymous" },
        token: user.accessToken,
      };
    } catch (error) {
      toast.error("Something went wrong");
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await signOut(auth);
    return {};
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, { dispatch, rejectWithValue }) => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          dispatch(clearUser());
          return resolve(rejectWithValue("No authenticated user found"));
        }

        try {
          const token = await user.getIdToken();
          dispatch(
            setUser({ name: user.displayName, email: user.email, token })
          );
          resolve({
            user: { name: user.displayName, email: user.email },
            token,
          });
        } catch (error) {
          dispatch(clearUser());
          resolve(rejectWithValue(error.message));
        }
      });
    });
  }
);
