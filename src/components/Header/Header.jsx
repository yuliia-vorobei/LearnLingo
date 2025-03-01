import { NavLink } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import css from "./Header.module.css";
import Icon from "../Icon/Icon";
import { useState } from "react";
import { LogInModal } from "../LogInModal/LogInModal";
import { RegistrationModal } from "../RegistrationModal/RegistrationModal";
import { useSelector } from "react-redux";
import { AuthNav } from "../AuthNav/AuthNav";

export const Header = () => {
  const [isModalOpenLogIn, setIsModalOpenLogIn] = useState(false);
  const [isModalOpenRegistration, setIsModalOpenRegistration] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleOpen = () => setIsModalOpenLogIn(true);
  const handleClose = () => setIsModalOpenLogIn(false);
  const handleOpenRegistration = () => setIsModalOpenRegistration(true);
  const handleCloseRegistration = () => setIsModalOpenRegistration(false);

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
          {isLoggedIn && (
            <NavLink to="/favorites" className={css.link}>
              Favorites
            </NavLink>
          )}
        </div>
        {isLoggedIn ? (
          <AuthNav />
        ) : (
          <div className={css.buttonContainer}>
            <button className={css.buttonContainerItem} onClick={handleOpen}>
              <Icon
                id="icon-logo"
                width={20}
                height={20}
                className={css.icon}
              />
              Log in
            </button>
            {isModalOpenLogIn && <LogInModal onClose={handleClose} />}
            <button
              className={css.registrationButton}
              onClick={handleOpenRegistration}
            >
              Registration
            </button>
            {isModalOpenRegistration && (
              <RegistrationModal onClose={handleCloseRegistration} />
            )}
          </div>
        )}
      </nav>
    </header>
  );
};
