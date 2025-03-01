import { useState } from "react";
import Modal from "../Modal/Modal";
import css from "./LogInModal.module.css";
import Icon from "../Icon/Icon";
import * as Yup from "yup";
import { Loader } from "../Loader/Loader";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/auth/operations";

export const LogInModal = ({ onClose }) => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const formData = {
      email: form.email.value.trim(),
      password: form.password.value.trim(),
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const user = await dispatch(loginUser(formData)).unwrap();
      setErrors({});
      form.reset();
      onClose();
    } catch (error) {
      if (error.inner) {
        // Yup validation errors
        const formattedErrors = {};
        error.inner.forEach((err) => {
          formattedErrors[err.path] = err.message;
        });
        setErrors(formattedErrors);
      }
    } finally {
      setLoading(false);
    }
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
        {loading && <Loader />}

        <button type="submit" className={css.bookBtn}>
          Log In
        </button>
      </form>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#F2F4F7",
            color: "#101828",
          },
        }}
      />
    </Modal>
  );
};
