import { useState } from "react";
import css from "./TrialLessonModal.module.css";
import Modal from "../Modal/Modal";
import * as Yup from "yup";

export const TrialLessonModal = ({ name, surname, avatar, onClose }) => {
  const [languagePurpose, setLanguagePurpose] = useState("career");
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
      .required("Phone number is required"),
  });

  const handlePurposeChange = (event) => {
    setLanguagePurpose(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim,
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
    <Modal
      title="Book trial lesson"
      classNameModal={css.modal}
      onClose={onClose}
    >
      <p className={css.experienceText}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>
      <div className={css.imgContainer}>
        <img src={avatar} alt="Teacher" className={css.image} />
        <div className={css.teacherBlock}>
          <span className={css.teacherBlockItem}> Your teacher</span>
          <p className={css.teachersName}>
            {[name, surname].filter(Boolean).join(" ")}
          </p>
        </div>
      </div>

      <p className={css.reasonsBlock}>
        What is your main reason for learning English?
      </p>
      <form onSubmit={handleSubmit}>
        <div className={css.formBlock}>
          <label className={css.label}>
            <input
              type="radio"
              value="career"
              name="languagePurpose"
              checked={languagePurpose === "career"}
              onChange={handlePurposeChange}
            />
            Career and business
          </label>
          <label className={css.label}>
            <input
              type="radio"
              value="kids"
              name="languagePurpose"
              checked={languagePurpose === "kids"}
              onChange={handlePurposeChange}
            />
            Lesson for kids
          </label>
          <label className={css.label}>
            <input
              type="radio"
              value="abroad"
              name="languagePurpose"
              checked={languagePurpose === "abroad"}
              onChange={handlePurposeChange}
            />
            Living abroad
          </label>
          <label className={css.label}>
            <input
              type="radio"
              value="exams"
              name="languagePurpose"
              checked={languagePurpose === "exams"}
              onChange={handlePurposeChange}
            />
            Exams and coursework
          </label>
          <label className={css.label}>
            <input
              type="radio"
              value="hobby"
              name="languagePurpose"
              checked={languagePurpose === "hobby"}
              onChange={handlePurposeChange}
            />
            Culture, travel or hobby
          </label>
        </div>

        <div className={css.userInfo}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
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

          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            className={css.input}
          ></input>
          {errors.phone && <p className={css.error}>{errors.phone}</p>}

          <button type="submit" className={css.bookBtn}>
            Book
          </button>
        </div>
      </form>
    </Modal>
  );
};
