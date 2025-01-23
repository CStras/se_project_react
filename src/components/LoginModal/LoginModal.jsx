import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";

const LoginModal = ({ closeActiveModal, isOpen, handleLogin }) => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("login modal handleSubmit");
    handleLogin(email, password); // come back to this
  };

  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      buttonText="Login"
      isOpen={isOpen}
      titleText="Login"
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="text"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
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
          autoComplete="current-password username"
        ></input>
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
