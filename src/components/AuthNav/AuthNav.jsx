import { useSelector } from "react-redux";
import Icon from "../Icon/Icon";
import css from "./AuthNav.module.css";

export const AuthNav = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user.name);
  return (
    <div className={css.buttonContainer}>
      <p className={css.welcomeText}>Welcome, {user.name}</p>
      <button className={css.buttonContainerItem}>
        <Icon id="icon-logo" width={20} height={20} className={css.icon} />
        Log out
      </button>
    </div>
  );
};
