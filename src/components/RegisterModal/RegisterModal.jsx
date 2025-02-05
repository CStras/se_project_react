import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";

const RegisterModal = ({
  closeActiveModal,
  isOpen,
  handleRegister,
  handleLoginClick,
  setActiveModal,
}) => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatar, setAvatar] = useState(""); //
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(name, email, password, avatar);
    e.preventDefault();
    handleRegister({
      name: name,
      email: email,
      password: password,
      avatar: avatar,
    });
  };

  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      firstBtnText="Sign Up"
      isOpen={isOpen}
      titleText="Register"
      onSubmit={handleSubmit}
      handleLoginClick={handleLoginClick}
      secondBtnText="or Log In"
      secondBtnClick={() => setActiveModal("login")}
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
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          autoComplete="email"
        ></input>
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL
        <input
          type="text"
          className="modal__input"
          id="avatar"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
        ></input>
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          autoComplete="current-password"
        ></input>
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
