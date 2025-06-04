import "./blocks/ModalWithForm.css";
import PageDataContext from "../contexts/PageDataContext";
import { useContext } from "react";

function ModalWithForm({ children, buttonText, title, isOpen, handleSubmit }) {
  const { handleCloseModalClick, stopModalPropagation } =
    useContext(PageDataContext);

  return (
    <div
      className={`modal ${isOpen && "modal_opened"}`}
      onClick={handleCloseModalClick}
    >
      <div className="modal__content" onClick={stopModalPropagation}>
        <form className="modal__form" onSubmit={handleSubmit}>
          <h2 className="modal__form-title">{title}</h2>
          <button
            className="modal__form-close"
            type="button"
            onClick={handleCloseModalClick}
          ></button>
          {children}
          <button className="modal__form-submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
