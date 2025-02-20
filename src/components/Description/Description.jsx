import css from "./Description.module.css";

export const Description = () => {
  return (
    <ul className={css.container}>
      <li className={css.list}>
        <span className={css.number}>32,000 +</span>
        <span className={css.description}>Experienced tutors</span>
      </li>
      <li className={css.list}>
        <span className={css.number}>300,000 +</span>
        <span className={css.description}>5-star tutor reviews</span>
      </li>
      <li className={css.list}>
        <span className={css.number}>120 +</span>
        <span className={css.description}>Subjects taught</span>
      </li>
      <li className={css.list}>
        <span className={css.number}>200 +</span>
        <span className={css.description}>Tutor nationalities</span>
      </li>
    </ul>
  );
};
