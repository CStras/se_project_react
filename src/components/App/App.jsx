import { useState } from 'react';

import './App.css'
import Header from '../Header/Header';
import Main from '../Main/Main'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import Footer from '../Footer/Footer'

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
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
        <Main weatherData={weatherData} />
        <ModalWithForm closeActiveModal={closeActiveModal} buttonText="Add garment" titleText="New garment" activeModal={activeModal}>
          <label htmlFor='name' className='modal__label'>Name
            <input type='text' className='modal__input' id='name' placeholder='Name'></input>
          </label>
          <label htmlFor='imageUrl' className='modal__label'>Image
            <input type='URL' className='modal__input' id='imageUrl' placeholder='Image URL'></input>
          </label>
          <fieldset className='modal__fieldset'>
            <legend className='modal__legend'>Select the weather type:</legend>
            <label htmlFor='hot' className='modal__label modal__label_type_radio'>
              <input type='radio' id='hot' className='modal__radio-input'></input>Hot
            </label>
            <label htmlFor='warm' className='modal__label modal__label_type_radio'>
              <input type='radio' className='modal__radio-input' id='warm'></input>Warm
            </label>
            <label htmlFor='cold' className='modal__label modal__label_type_radio'>
              <input type='radio' className='modal__radio-input' id='cold'></input>Cold
            </label>
          </fieldset>
        </ModalWithForm>
      </div>
      <Footer />
    </div>
  );
}

export default App
