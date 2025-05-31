import ModalWithForm from "./ModalWithForm";
import { useContext } from "react";
import PageDataContext from "../contexts/PageDataContext";
import "./blocks/ModalWithForm.css";
import UserDataContext from "../contexts/UserDataContext";

function LogOutModal() {
  const { activeModal, setActiveModal } = useContext(PageDataContext);
  const { setUser } = useContext(UserDataContext);

  const handleSubmit = () => {
    setActiveModal("");
    setUser({ name: "", avatarUrl: "" });
    localStorage.removeItem("user");
  };

  return (
    <ModalWithForm
      buttonText="YES"
      title="Log Out and Delete?"
      isOpen={activeModal == "delete-modal"}
      handleSubmit={handleSubmit}
    >
      <p className="modal__logout-text">
        Are You Sure? <br /> All Data Will Be Deleted
      </p>
    </ModalWithForm>
  );
}

export default LogOutModal;
