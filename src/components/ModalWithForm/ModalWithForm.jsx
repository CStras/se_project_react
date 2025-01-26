import "./ModalWithForm.css";

function ModalWithForm({
  children,
  titleText,
  closeActiveModal,
  handleOverlay,
  isOpen,
  onSubmit,
  secondBtnClick,
  firstBtnText,
  secondBtnText,
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
            {firstBtnText && (
              <button className="modal__submit" type="submit">
                {firstBtnText}
              </button>
            )}
            {secondBtnText && (
              <button
                className="modal__second-btn"
                type="button"
                onClick={secondBtnClick}
              >
                {secondBtnText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
