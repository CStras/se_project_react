import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({
  activeModal,
  card,
  closeActiveModal,
  handleOverlay,
  handleDeleteCard,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;

  const deleteCardClick = () => {
    handleDeleteCard(card._id);
  };

  return (
    <div
      onClick={handleOverlay}
      className={`modal ${activeModal === "preview" && "modal_open"}`}
    >
      <div className="modal__content modal__content_type_image">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close modal__close_item"
        ></button>
        <img className="modal__image" src={card.imageUrl} alt={card.name} />
        <div className="modal__footer">
          <div className="modal__details">
            <p className="modal__caption">{card.name}</p>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {isOwn && (
            <button
              className="modal__delete-btn"
              type="button"
              onClick={deleteCardClick}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
