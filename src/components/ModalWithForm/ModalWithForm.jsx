import "./ModalWithForm.css";
import { Link } from "react-router-dom";

function ModalWithForm({
  children,
  buttonText,
  titleText,
  closeActiveModal,
  handleOverlay,
  isOpen,
  onSubmit,
  handleLoginClick,
}) {
  return (
    <div onClick={handleOverlay} className={`modal ${isOpen && "modal_open"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{titleText}</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        />
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__next-btn">
            <button className="modal__submit" type="submit">
              {buttonText}
            </button>
            {titleText === "Register" && (
              <button
                className="submit_login"
                type="submit"
                onClick={handleLoginClick}
              >
                or Log in
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
