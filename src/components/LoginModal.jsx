import ModalWithForm from "./ModalWithForm";
import "./blocks/ModalWithForm.css";
import { useState, useEffect, useContext } from "react";
import PageDataContext from "../contexts/PageDataContext";
import UserDataContext from "../contexts/UserDataContext";

function LoginModal() {
  const { activeModal, setActiveModal } = useContext(PageDataContext);
  const { setUser } = useContext(UserDataContext);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    setName("");
    setAvatarUrl("");
  }, [activeModal == "login-modal"]);

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ name: name, avatarUrl: avatarUrl });
    setActiveModal("");
  };

  return (
    <ModalWithForm
      buttonText={"Log In"}
      title={"Log In"}
      isOpen={activeModal == "login-modal"}
      handleSubmit={handleSubmit}
    >
      <label htmlFor="login-name" className="modal__label">
        Name{" "}
        <input
          value={name}
          onChange={handleNameChange}
          type="text"
          className="modal__input"
          id="login-name"
          placeholder="Name"
          required
        />
      </label>
      <label htmlFor="login-avatarUrl" className="modal__label">
        Avatar URL{" "}
        <input
          value={avatarUrl}
          onChange={handleAvatarUrlChange}
          type="url"
          className="modal__input"
          id="login-avatarUrl"
          placeholder="Avatar URL"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
