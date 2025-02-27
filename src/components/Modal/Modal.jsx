import clsx from "clsx";
import Icon from "../Icon/Icon";
import css from "./Modal.module.css";
import { useEffect } from "react";

const Modal = ({ children, title, onClose, classNameModal }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackDropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <div onClick={handleBackDropClick} className={css.backdrop}>
      <div className={clsx(css.modal, classNameModal)}>
        <button
          aria-label="Close modal button"
          className={css.closeModalBtn}
          onClick={onClose}
        >
          <Icon id="icon-close" width={32} height={32} className={css.icon} />
        </button>
        <div className={css.textContainer}>
          <h3 className={css.title}>{title}</h3>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
