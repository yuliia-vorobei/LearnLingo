import css from "./Advantages.module.css";

export const Advantages = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>
        Unlock your potential with the best{" "}
        <span className={css.languageSpan}>language</span> tutors
      </h1>
      <p className={css.text}>
        Embark on an Exciting Language Journey with Expert Language Tutors:
        Elevate your language proficiency to new heights by connecting with
        highly qualified and experienced tutors.
      </p>
      <button className={css.button}>Get started</button>
    </div>
  );
};
