import { useState } from "react";
import Modal from "../Modal/Modal";
import css from "./RegistrationModal.module.css";
import Icon from "../Icon/Icon";
import * as Yup from "yup";

export const RegistrationModal = ({ onClose }) => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value.trim(),
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      form.reset();
      onClose();
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }
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
        {errors.name && <p className={css.error}>{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className={css.input}
        ></input>
        {errors.email && <p className={css.error}>{errors.email}</p>}

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
        {errors.password && <p className={css.error}>{errors.password}</p>}

        <button type="submit" className={css.bookBtn}>
          Sign Up
        </button>
      </form>
    </Modal>
  );
};
