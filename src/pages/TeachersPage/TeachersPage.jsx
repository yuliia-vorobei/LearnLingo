import { useDispatch, useSelector } from "react-redux";
import { fetchTeachersInfo } from "../../redux/operations";
import { useEffect } from "react";
import { TeacherCard } from "../../components/TeacherCard/TeacherCard";
import { Loader } from "../../components/Loader/Loader";
import css from "./TeachersPage.module.css";

const TeachersPage = () => {
  const dispatch = useDispatch();
  const { isLoading, items, isError } = useSelector((state) => state.teachers);

  useEffect(() => {
    dispatch(fetchTeachersInfo());
  }, [dispatch]);

  return (
    <div className={css.container}>
      {isLoading && <Loader />}
      {isError && <p>Whoops something went wrong</p>}

      {items.length > 0 && <TeacherCard items={items} />}
    </div>
  );
};

export default TeachersPage;
