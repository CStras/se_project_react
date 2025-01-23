import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import "../ModalWithForm/ModalWithForm.css";

function EditProfileModal({ closeActiveModal, isOpen, onEditProfile }) {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatarURL, setAvatarURL] = useState("");
  const handleAvatarURLChange = (e) => {
    setAvatarURL(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile({ name, avatarURL });
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
      <label htmlFor="avatarURL" className="modal__label">
        Avatar URL
        <input
          type="URL"
          className="modal__input"
          id="avatarURL"
          placeholder="Avatar URL"
          value={avatarURL}
          onChange={handleAvatarURLChange}
        ></input>
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
