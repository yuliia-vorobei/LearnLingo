import css from "./Memoji.module.css";
import memoji from "../../assets/memoji.png";
import laptop from "../../assets/Mac-removebg-preview.png";

export const Memoji = () => {
  return (
    <div className={css.container}>
      <img src={laptop} className={css.image}></img>
      <img src={memoji} className={css.memoji} width="339px"></img>
    </div>
  );
};
