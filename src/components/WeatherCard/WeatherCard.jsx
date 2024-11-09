import cloudy from '../../assets/cloudy.svg'
import './WeatherCard.css'

function WeatherCard() {
    return <section className="weather-card">
        <p className="weather-card__temp">75 &deg;</p>
        <img src={cloudy} alt="" className="weather-card__image" />
    </section>;
}

export default WeatherCard;