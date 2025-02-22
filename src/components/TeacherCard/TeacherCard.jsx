import Icon from "../Icon/Icon";
import css from "./TeacherCard.module.css";
import { FaUserCircle } from "react-icons/fa";

export const TeacherCard = ({ items }) => {
  function setRating(rating) {
    return `${rating}.${"0"}`;
  }

  return (
    <>
      <ul className={css.list}>
        {items.map(
          ({
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
            id,
          }) => (
            <li key={items[id]} className={css.item}>
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

                    <p className={css.description}>
                      Lessons done: {lessons_done}
                    </p>

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
                    <Icon
                      id="icon-heart"
                      width={26}
                      height={26}
                      className={css.iconHeart}
                    />
                  </div>
                </div>
                <h2 className={css.title}>
                  {[name, surname].filter(Boolean).join(" ")}
                </h2>
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
                <p className={css.experienceInfo}>{experience}</p>
                {reviews.map(({ comment, reviewer_name, reviewer_rating }) => (
                  <div key={comment} className={css.reviewContainer}>
                    <FaUserCircle className={css.reviewerIcon} />
                    <div className={css.contentContainer}>
                      <div className={css.topRow}>
                        <p className={css.additionalInfo}>{reviewer_name}</p>
                        <div className={css.ratingContainer}>
                          <Icon
                            id="icon-Star"
                            width={16}
                            height={16}
                            className={css.iconStar}
                          />
                          <p>{setRating(reviewer_rating)}</p>
                        </div>
                      </div>
                      <p className={css.reviewComment}>{comment}</p>
                    </div>
                  </div>
                ))}

                <div className={css.levelContainer}>
                  {levels.map((level, index) => (
                    <span key={index} className={css.languageLevel}>
                      #{level}
                    </span>
                  ))}
                </div>
                <button className={css.button}>Book trial lesson</button>
              </div>
            </li>
          )
        )}
      </ul>
    </>
  );
};
