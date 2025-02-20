import { NavLink } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import css from "./Header.module.css";
import Icon from "../Icon/Icon";

export const Header = () => {
  return (
    <header className={css.header}>
      <Logo />
      <nav className={css.linkContainer}>
        <div className={css.linkContainerItem}>
          <NavLink to="/" className={css.link}>
            Home
          </NavLink>
          <NavLink to="/teachers" className={css.link}>
            Teachers
          </NavLink>
        </div>
        <div className={css.buttonContainer}>
          <button className={css.buttonContainerItem}>
            <Icon id="icon-logo" width={20} height={20} className={css.icon} />
            Log in
          </button>
          <button className={css.registartionButton}>Registration</button>
        </div>
      </nav>
    </header>
  );
};
