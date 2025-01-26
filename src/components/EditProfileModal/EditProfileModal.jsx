import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useContext } from "react";
import "../ModalWithForm/ModalWithForm.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfileModal({ closeActiveModal, isOpen, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatar, setAvatar] = useState(currentUser.avatar);
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile({ name, avatar });
  };

  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      firstBtnText="Save"
      isOpen={isOpen}
      titleText="Edit profile"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        ></input>
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL
        <input
          type="URL"
          className="modal__input"
          id="avatar"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
        ></input>
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
