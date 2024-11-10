import { act, useState } from 'react';

import './App.css'
import Header from '../Header/Header';
import Main from '../Main/Main'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import ItemModal from '../ItemModal/ItemModal';
import Footer from '../Footer/Footer'

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const openedModal = document.querySelector(".modal__open");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  const handleOverlay = (evt) => {
    if (evt.target.classList.contains("modal__open")) {
      closeActiveModal();
    }
  }

  const handleAddClick = () => {
    setActiveModal("add-garment")
  }

  const closeActiveModal = () => {
    setActiveModal("");
  }

  return (
    <div className='app'>
      <div className="app__content">
        <Header handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <ModalWithForm handleOverlay={handleOverlay} closeActiveModal={closeActiveModal} buttonText="Add garment" titleText="New garment" activeModal={activeModal}>
          <label htmlFor='name' className='modal__label'>Name
            <input type='text' className='modal__input' id='name' placeholder='Name'></input>
          </label>
          <label htmlFor='imageUrl' className='modal__label'>Image
            <input type='URL' className='modal__input' id='imageUrl' placeholder='Image URL'></input>
          </label>
          <fieldset className='modal__fieldset'>
            <legend className='modal__legend'>Select the weather type:</legend>
            <div>
            <input type='radio' id='hot' name='weather' className='modal__radio-input'></input>
            <label htmlFor='hot' className='modal__label modal__label_type_radio'>
              Hot
            </label>
            </div>
            <div>
            <input type='radio' name='weather' className='modal__radio-input' id='warm'></input>
            <label htmlFor='warm' className='modal__label modal__label_type_radio'>
              Warm
            </label>
            </div>
            <div>
            <input type='radio' name='weather' className='modal__radio-input' id='cold'></input>
            <label htmlFor='cold' className='modal__label modal__label_type_radio'>
              Cold
            </label>
            </div>
          </fieldset>
        </ModalWithForm>
        <ItemModal handleOverlay={handleOverlay} activeModal={activeModal} card={selectedCard} closeActiveModal={closeActiveModal} />
      </div>
      <Footer />
    </div>
  );
}

export default App
