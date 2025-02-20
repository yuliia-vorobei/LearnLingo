import css from "./Memoji.module.css";

export const Memoji = () => {
  return (
    <div className={css.container}>
      <img
        src="../../../public/Mac-removebg-preview.png"
        className={css.image}
      ></img>
      <img
        src="../../../public/memoji.png"
        className={css.memoji}
        width="339px"
      ></img>
    </div>
  );
};
