import { useState } from "react";
import Modal from "../Modal/Modal";
import css from "./LogInModal.module.css";
import Icon from "../Icon/Icon";

export const LogInModal = ({ onClose }) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    form.reset();
    onClose();
  };

  return (
    <Modal title="Log In" classNameModal={css.modal} onClose={onClose}>
      <p className={css.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={css.input}
        ></input>
        <div className={css.passwordContainer}>
          <input
            type={visiblePassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className={css.inputPassword}
          ></input>
          <button
            type="button"
            className={css.iconbutton}
            width="20"
            height="20"
            onClick={() => setVisiblePassword(!visiblePassword)}
          >
            <Icon
              id="password-off"
              width={20}
              height={20}
              className={css.icon}
            />
          </button>
        </div>
        <button type="submit" className={css.bookBtn}>
          Log In
        </button>
      </form>
    </Modal>
  );
};
