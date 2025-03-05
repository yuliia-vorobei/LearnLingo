import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TeacherCard } from "../../components/TeacherCard/TeacherCard";
import css from "./Favorites.module.css";
import { Loader } from "../../components/Loader/Loader";
import { fetchTeachersInfo } from "../../redux/teachers/operations";

export const Favorites = () => {
  // const dispatch = useDispatch();
  const { favorite } = useSelector((state) => state.teachers);
  return <div className={css.container}></div>;
};

export default Favorites;
