import { useSelector } from "react-redux";
import { TeacherCard } from "../../components/TeacherCard/TeacherCard";
import css from "./Favorites.module.css";
import { useState } from "react";

export const Favorites = () => {
  const { favoriteItems } = useSelector((state) => state.favorite);
  const [readMoreBtn, setReadMoreBtn] = useState(null);
  const [bookTrial, setBookTrial] = useState(null);
  const [loadMore, setLoadMore] = useState(4);

  const loadMoreBtn = () => setLoadMore((prevPage) => prevPage + 3);

  return (
    <div className={css.container}>
      {favoriteItems.length > 0 &&
        favoriteItems
          .slice(0, loadMore)
          .map((teacher) => (
            <TeacherCard
              key={teacher.avatar_url}
              {...teacher}
              readMoreBtn={readMoreBtn}
              setReadMoreBtn={setReadMoreBtn}
              bookTrial={bookTrial}
              setBookTrial={setBookTrial}
            />
          ))}
      {loadMore < favoriteItems.length && (
        <button onClick={loadMoreBtn} className={css.button}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Favorites;
