import "./blocks/ModalWithForm.css";
import PageDataContext from "../contexts/PageDataContext";
import { useContext } from "react";

function ModalWithForm({ children, buttonText, title, isOpen, handleSubmit }) {
  const { handleCloseModalClick } = useContext(PageDataContext);

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <form className="modal__form" onSubmit={handleSubmit}>
          <h2 className="modal__title">{title}</h2>
          <button
            className="modal__close-button"
            type="button"
            onClick={handleCloseModalClick}
          ></button>
          {children}
          <button className="modal__form_submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
