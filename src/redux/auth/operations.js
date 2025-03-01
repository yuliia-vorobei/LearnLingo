import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../database/firebaseConfig";
import { get, ref, set } from "firebase/database";
import toast from "react-hot-toast";

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

      console.log("User registered:", user);

      return {
        user: { name: formData.name, email: formData.email },
        token: user.accessToken,
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

      const userRef = ref(db, `users/${user.uid}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        toast.success(`Welcome back, ${snapshot.val().name}!`);
      } else {
        toast.error("User data is not found");
      }

      console.log("User logged in:", user);

      return {
        user: { email: formData.email, name: name || "Anonymous" },
        token: user.accessToken,
      };
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      return rejectWithValue(error.message);
    }
  }
);
