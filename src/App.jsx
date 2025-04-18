import { Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import { Loader } from "./components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/operations";
import { auth } from "./database/firebaseConfig";
import { setUserId } from "./redux/favorite/favoriteSlice";
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const TeachersPage = lazy(() => import("./pages/TeachersPage/TeachersPage"));
const Favorites = lazy(() => import("./pages/Favorites/Favorites"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  useEffect(() => {
    if (auth.isLoggedIn && auth.user?.email) {
      dispatch(setUserId(auth.user.email)); // load their favorites
    }
  }, [dispatch]);

  return (
    <>
      <SharedLayout />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          {isLoggedIn && (
            <Route path="/favorites" element={<Favorites />}></Route>
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
