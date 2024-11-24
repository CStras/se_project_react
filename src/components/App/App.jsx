import { useEffect, useState } from 'react';

import './App.css'
import Header from '../Header/Header';
import Main from '../Main/Main'
import ItemModal from '../ItemModal/ItemModal';
import Footer from '../Footer/Footer'
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import { coordinates, APIkey } from '../../utils/constants';
import {CurrentTemperatureUnitContext} from '../../contexts/CurrentTemperatureUnitContext';
import AddItemModal from '../AddItemModal/AddItemModal';

function App() {
  const [weatherData, setWeatherData] = useState({ 
    type: "cold", 
    temp: { F: 999, C: 998 }, 
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  const handleAddClick = () => {
    setActiveModal("add-garment");

  }

  const closeActiveModal = () => {
    setActiveModal("");
  }

  const onAddItem = (e) => {
    console.log(e);
  }

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === 'C') setCurrentTemperatureUnit('F')
    if (currentTemperatureUnit === 'F') setCurrentTemperatureUnit('C')
  }

  useEffect(() => {
    getWeather(coordinates, APIkey)
    .then((data) => {
      const filterData = filterWeatherData(data);
      setWeatherData(filterData);
    })
    .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleModalClose = (evt) => {
      if ((evt.target.classList.contains("modal_open") && evt.type === "click") || evt.key === "Escape") {
        closeActiveModal();
      }
    }

    document.addEventListener("keydown", handleModalClose);
    document.addEventListener("click", handleModalClose);

    return () => {
      document.removeEventListener("keydown", handleModalClose);
      document.removeEventListener("click", handleModalClose);
    }

  }, [activeModal]);


  return (
    <div className='app'>
      <div className="app__content">
        <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
        {activeModal === "add-garment" && <AddItemModal activeModal={activeModal} closeActiveModal={closeActiveModal} isOpen={activeModal === "add-garment"} onAddItem={onAddItem} />}
        <ItemModal  activeModal={activeModal} card={selectedCard} closeActiveModal={closeActiveModal} />
        </CurrentTemperatureUnitContext.Provider>
      </div>

      
    </div>
  );
}

export default App
