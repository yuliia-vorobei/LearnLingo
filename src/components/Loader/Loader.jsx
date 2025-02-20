import { FadeLoader } from "react-spinners";
import css from "./Loader.module.css";

export const Loader = () => {
  return (
    <>
      <FadeLoader color="#161313" height={15} className={css.loader} />
    </>
  );
};
