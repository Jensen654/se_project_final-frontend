import ModalWithForm from "./ModalWithForm";
import { useContext, useState } from "react";
import UserDataContext from "../contexts/UserDataContext";
import PageDataContext from "../contexts/PageDataContext";

function EditProfileModal() {
  const { user, setUser } = useContext(UserDataContext);
  const { activeModal, setActiveModal } = useContext(PageDataContext);
  const [name, setName] = useState(user.name);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);

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
      buttonText="Update Profile"
      title="Update Profile"
      isOpen={activeModal == "edit-modal"}
      handleSubmit={handleSubmit}
    >
      <label htmlFor="edit-name" className="modal__label">
        Name{" "}
        <input
          value={name}
          onChange={handleNameChange}
          type="text"
          className="modal__input"
          id="edit-name"
          placeholder="Name"
          required
        />
      </label>
      <label htmlFor="edit-avatarUrl" className="modal__label">
        Avatar URL{" "}
        <input
          value={avatarUrl}
          onChange={handleAvatarUrlChange}
          type="url"
          className="modal__input"
          id="edit-avatarUrl"
          placeholder="Avatar URL"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
