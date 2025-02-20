import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCXlFA84x5vM_WY4b7LjEhCmE3Mstpq3dU",
  authDomain: "learnlingo-18ec5.firebaseapp.com",
  databaseURL:
    "https://learnlingo-18ec5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "learnlingo-18ec5",
  storageBucket: "learnlingo-18ec5.firebasestorage.app",
  messagingSenderId: "1006573973896",
  appId: "1:1006573973896:web:217beee9c47a9cbc258a3d",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, push };
