import { useState } from "react";
import Modal from "../Modal/Modal";
import css from "./RegistrationModal.module.css";
import Icon from "../Icon/Icon";

export const RegistrationModal = ({ onClose }) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    form.reset();
    onClose();
  };

  return (
    <Modal title="Registration" classNameModal={css.modal} onClose={onClose}>
      <p className={css.text}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className={css.input}
        ></input>
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
          Sign Up
        </button>
      </form>
    </Modal>
  );
};
