import { useDispatch } from "react-redux";
import Icon from "../Icon/Icon";
import css from "./AuthNav.module.css";
import { logout } from "../../redux/auth/operations";

export const AuthNav = () => {
  //   const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div className={css.buttonContainer}>
      <p className={css.welcomeText}>Welcome, student</p>
      <button
        className={css.buttonContainerItem}
        onClick={() => dispatch(logout())}
      >
        <Icon id="icon-logo" width={20} height={20} className={css.icon} />
        Log out
      </button>
    </div>
  );
};
