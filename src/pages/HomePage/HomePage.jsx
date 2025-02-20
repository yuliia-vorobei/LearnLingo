import { Advantages } from "../../components/Advantages/Advantages";
import { Description } from "../../components/Description/Description";
import { Memoji } from "../../components/Memoji/Memoji";
import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={css.container}>
      <div className={css.list}>
        <Advantages />
        <Memoji />
      </div>

      <Description />
    </div>
  );
};

export default HomePage;
