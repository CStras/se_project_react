import cloudy from '../../assets/cloudy.svg'
import './WeatherCard.css'

function WeatherCard({weatherData}) {
    return <section className="weather-card">
        <p className="weather-card__temp">{weatherData.temp.F} &deg;</p>
        <img src={cloudy} alt="" className="weather-card__image" />
    </section>;
}

export default WeatherCard;