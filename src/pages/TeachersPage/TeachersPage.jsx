import { useDispatch, useSelector } from "react-redux";
import { fetchTeachersInfo } from "../../redux/teachers/operations";
import { useEffect, useRef, useState } from "react";
import { TeacherCard } from "../../components/TeacherCard/TeacherCard";
import { Loader } from "../../components/Loader/Loader";
import css from "./TeachersPage.module.css";
import { resetTeachers } from "../../redux/teachers/teachersSlice";
import { FilterComponent } from "../../components/FilterComponent/FilterComponent";

const TeachersPage = () => {
  const [readMoreBtn, setReadMoreBtn] = useState(null);

  const [bookTrial, setBookTrial] = useState(null);
  const dispatch = useDispatch();
  const { isLoading, items, error, lastKey } = useSelector(
    (state) => state.teachers
  );
  const filters = useSelector((state) => state.filters.data);

  const prevFiltersRef = useRef();

  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    const filtersChanged =
      JSON.stringify(prevFilters) !== JSON.stringify(filters);

    if (filtersChanged) {
      dispatch(resetTeachers());
      dispatch(fetchTeachersInfo({ limit: 3, filters }));
      prevFiltersRef.current = filters;
    }
  }, [dispatch, filters]);

  const loadMore = () => {
    if (lastKey) {
      dispatch(fetchTeachersInfo({ limit: 4, startKey: lastKey, filters }));
    }
  };

  const hasMoreItems = lastKey !== null && !isLoading && items.length > 0;

  return (
    <div className={css.container}>
      {error && <p>Whoops something went wrong</p>}
      <FilterComponent />
      {items.length > 0 && (
        <ul>
          {items.map((teacher, index) => (
            <TeacherCard
              key={index}
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
      {hasMoreItems && (
        <button onClick={loadMore} className={css.button}>
          Load More
        </button>
      )}
    </div>
  );
};

export default TeachersPage;
