import WeatherCard from '../WeatherCard/WeatherCard'
import ItemCard from '../ItemCard/ItemCard';
import './Main.css'
import { defaultClothingItems } from '../../utils/constants';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import { useContext } from 'react';

function Main({ weatherData, handleCardClick }) {

    const {currentTemperatureUnit} = useContext(CurrentTemperatureUnitContext)

    const temperature = weatherData?.temp?.[currentTemperatureUnit];

    return (
        <main>
            <WeatherCard weatherData={weatherData} temp={temperature} currentUnit={currentTemperatureUnit}/>
            <section className='cards'>
                <p className='cards__text'>Today is {temperature} &deg; {currentTemperatureUnit} / You may want to wear:</p>
                <ul className="cards__list">
                    {defaultClothingItems
                        .filter((item) => {
                            return item.weather === weatherData.type;
                        }).map((item) => {
                            return <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
                        })}
                </ul>
            </section>
        </main>
    );
}

export default Main;