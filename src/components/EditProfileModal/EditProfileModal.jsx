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

  const [avatar, setAvatarURL] = useState(currentUser.avatar);
  const handleAvatarURLChange = (e) => {
    setAvatarURL(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile({ name, avatar });
  };

  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      buttonText="Save"
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
          onChange={handleAvatarURLChange}
        ></input>
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
