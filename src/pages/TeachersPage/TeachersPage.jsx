import { useDispatch, useSelector } from "react-redux";
import { fetchTeachersInfo } from "../../redux/teachers/operations";
import { useEffect, useState } from "react";
import { TeacherCard } from "../../components/TeacherCard/TeacherCard";
import { Loader } from "../../components/Loader/Loader";
import css from "./TeachersPage.module.css";
import { resetTeachers } from "../../redux/teachers/teachersSlice";
import { FilterComponent } from "../../components/FilterComponent/FilterComponent";

const TeachersPage = () => {
  const [readMoreBtn, setReadMoreBtn] = useState(null);
  const [bookTrial, setBookTrial] = useState(null);
  const dispatch = useDispatch();
  const { isLoading, lastKey, items, error } = useSelector(
    (state) => state.teachers
  );

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchTeachersInfo({ limit: 3 }));
      resetTeachers();
    }
  }, [dispatch, items.length]);

  const loadMore = () => {
    if (lastKey) {
      dispatch(fetchTeachersInfo({ limit: 4, startKey: lastKey }));
    }
  };
  useEffect(() => {
    console.log("Last Key:", lastKey);
  }, [lastKey]);

  return (
    <div className={css.container}>
      {error && <p>Whoops something went wrong</p>}
      <FilterComponent />
      {items.length > 0 && (
        <ul className={css.list}>
          {items.map((teacher) => (
            <TeacherCard
              key={teacher.avatar_url}
              {...teacher}
              readMoreBtn={readMoreBtn}
              setReadMoreBtn={setReadMoreBtn}
              bookTrial={bookTrial}
              setBookTrial={setBookTrial}
            />
          ))}
        </ul>
      )}
      {isLoading && <Loader />}
      {lastKey !== null && (
        <button onClick={loadMore} className={css.button}>
          Load More
        </button>
      )}
    </div>
  );
};

export default TeachersPage;
