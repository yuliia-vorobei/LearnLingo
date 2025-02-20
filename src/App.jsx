import { Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import { Loader } from "./components/Loader/Loader";

function App() {
  const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
  const TeachersPage = lazy(() => import("./pages/TeachersPage/TeachersPage"));
  const Favorites = lazy(() => import("./pages/Favorites/Favorites"));
  const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

  return (
    <>
      <SharedLayout />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
