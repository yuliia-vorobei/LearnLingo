import { useDispatch, useSelector } from "react-redux";
import Icon from "../Icon/Icon";
import { Reviews } from "../Reviews/Reviews";
import { TrialLessonModal } from "../TrialLessonModal/TrialLessonModal";
import css from "./TeacherCard.module.css";
import { useEffect, useState } from "react";
import { LogInModal } from "../LogInModal/LogInModal";
import { toggleFavorite } from "../../redux/favorite/favoriteSlice";

export const TeacherCard = ({
  avatar_url,
  conditions,
  languages,
  experience,
  lesson_info,
  lessons_done,
  levels,
  name,
  price_per_hour,
  rating,
  reviews,
  surname,
  readMoreBtn,
  setReadMoreBtn,
  bookTrial,
  setBookTrial,
}) => {
  const [isModalOpenLogIn, setIsModalOpenLogIn] = useState(false);
  const handleOpen = () => setIsModalOpenLogIn(true);
  const handleClose = () => setIsModalOpenLogIn(false);

  const dispatch = useDispatch();
  const { favoriteItems } = useSelector((state) => state.favorite);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isOpen = readMoreBtn === avatar_url;
  const isBookTrialOpen = bookTrial === avatar_url;
  const isFavorite = favoriteItems.some(
    (item) => item.avatar_url === avatar_url
  );
  useEffect(() => {
    localStorage.setItem("teacher", JSON.stringify(favoriteItems || []));
  }, [favoriteItems]);

  function addFavorite(teacher) {
    dispatch(toggleFavorite(teacher));
  }

  return (
    <>
      <li key={avatar_url} className={css.item}>
        <img src={avatar_url} alt="Teacher" className={css.image} />
        <div className={css.infoContainer}>
          <div className={css.infoContainerItem}>
            <p className={css.additionalInfo}>Languages</p>

            <div className={css.descriptionContainer}>
              <div className={css.iconContainer}>
                <Icon
                  id="icon-book"
                  width={16}
                  height={16}
                  className={css.iconBook}
                />
                <p className={css.description}>Lessons online</p>
              </div>

              <p className={css.description}>Lessons done: {lessons_done}</p>

              <div className={css.iconContainer}>
                <Icon
                  id="icon-Star"
                  width={16}
                  height={16}
                  className={css.iconStar}
                  fill="#ffc531"
                />
                <p className={css.description}>Rating: {rating}</p>
              </div>

              <p className={css.description}>
                Price / 1 hour:
                <span className={css.price}> {price_per_hour}$</span>
              </p>
              {!isLoggedIn || isModalOpenLogIn ? (
                <button className={css.heartButton} onClick={handleOpen}>
                  <Icon
                    id="icon-heart"
                    width={26}
                    height={26}
                    className={
                      isFavorite && isLoggedIn
                        ? css.iconHeartFilled
                        : css.iconHeart
                    }
                  />
                </button>
              ) : (
                <button
                  className={css.heartButton}
                  onClick={() =>
                    addFavorite({
                      avatar_url,
                      conditions,
                      languages,
                      experience,
                      lesson_info,
                      lessons_done,
                      levels,
                      name,
                      price_per_hour,
                      rating,
                      reviews,
                      surname,
                    })
                  }
                >
                  <Icon
                    id="icon-heart"
                    width={26}
                    height={26}
                    className={
                      isFavorite && isLoggedIn
                        ? css.iconHeartFilled
                        : css.iconHeart
                    }
                  />
                </button>
              )}
              {isModalOpenLogIn && <LogInModal onClose={handleClose} />}
            </div>
          </div>
          <h3 className={css.title}>
            {[name, surname].filter(Boolean).join(" ")}
          </h3>
          <p className={css.additionalInfo}>
            Speaks:{" "}
            <span className={css.additionalInfoItem}>
              {languages.join(", ")}
            </span>
          </p>
          <p className={css.additionalInfo}>
            Lesson Info:{" "}
            <span className={css.additionalInfoItem}>{lesson_info}</span>
          </p>
          <p className={css.additionalInfo}>
            Conditions:{" "}
            <span className={css.additionalInfoItem}>{conditions}</span>
          </p>

          {!isOpen && (
            <button
              className={css.readMoreBtn}
              onClick={() => setReadMoreBtn(isOpen ? null : avatar_url)}
            >
              Read more
            </button>
          )}

          {isOpen && <Reviews reviews={reviews} experience={experience} />}

          <div className={css.levelContainer}>
            {levels.map((level, index) => (
              <span key={index} className={css.languageLevel}>
                #{level}
              </span>
            ))}
          </div>
          {!isBookTrialOpen && (
            <button
              className={css.button}
              onClick={() => setBookTrial(isBookTrialOpen ? null : avatar_url)}
            >
              Book trial lesson
            </button>
          )}
          {isBookTrialOpen && (
            <TrialLessonModal
              name={name}
              surname={surname}
              avatar={avatar_url}
              onClose={() => setBookTrial(isBookTrialOpen ? null : avatar_url)}
            />
          )}
        </div>
      </li>
    </>
  );
};
