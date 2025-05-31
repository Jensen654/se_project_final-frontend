import ModalWithForm from "./ModalWithForm";
import "./blocks/ModalWithForm.css";
import { useState, useEffect, useContext } from "react";
import PageDataContext from "../contexts/PageDataContext";
import UserDataContext from "../contexts/UserDataContext";

function SignUpModal() {
  const { activeModal } = useContext(PageDataContext);
  const { setUser } = useContext(UserDataContext);
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isOpen = activeModal == "signup-modal";

  useEffect(() => {
    setName("");
    setAvatarUrl("");
    setPassword("");
    setEmail("");
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ name: name, avatarUrl: avatarUrl });
  };

  return (
    <ModalWithForm
      buttonText={"Sign Up"}
      title={"Sign Up"}
      isOpen={activeModal == "signup-modal"}
      handleSubmit={handleSubmit}
    >
      <label htmlFor="signup-name" className="modal__label">
        Name{" "}
        <input
          value={name}
          onChange={handleNameChange}
          type="text"
          className="modal__input"
          id="signup-name"
          placeholder="Name"
          required
        />
      </label>
      <label htmlFor="signup-avatar-url" className="modal__label">
        Avatar URL{" "}
        <input
          value={avatarUrl}
          onChange={handleAvatarUrlChange}
          type="url"
          className="modal__input"
          id="signup-avatar-url"
          placeholder="Avatar URL"
          required
        />
      </label>
      <label htmlFor="signup-email" className="modal__label">
        Email{" "}
        <input
          value={email}
          onChange={handleEmailChange}
          type="email"
          className="modal__input"
          id="signup-email"
          placeholder="Email"
          required
        />
      </label>
      <label htmlFor="signup-password" className="modal__label">
        Password{" "}
        <input
          value={password}
          onChange={handlePasswordChange}
          type="password"
          className="modal__input"
          id="signup-password"
          placeholder="Password"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default SignUpModal;
