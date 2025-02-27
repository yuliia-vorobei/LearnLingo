import { FaUserCircle } from "react-icons/fa";
import css from "./Reviews.module.css";
import Icon from "../Icon/Icon";

export const Reviews = ({ reviews, experience }) => {
  function setRating(rating) {
    return `${rating}.${"0"}`;
  }
  return (
    <>
      <div>
        <p className={css.experienceInfo}>{experience}</p>
        {reviews.map(({ comment, reviewer_name, reviewer_rating }) => (
          <div
            key={`${reviewer_name}-${reviewer_rating}`}
            className={css.reviewContainer}
          >
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
      </div>
    </>
  );
};
