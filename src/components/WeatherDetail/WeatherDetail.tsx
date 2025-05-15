import { Weather } from "../../hooks/useWeather"
import { formatTemperature } from "../../utils"

type WeatherDetailProps = {
    weather: Weather
}

export default function WeatherDetail({ weather }: WeatherDetailProps) {
    return (
        <div>
            <h2>City: {weather.name}</h2>
            <p>Current Temperature: {formatTemperature(weather.main.temp)}&deg;C</p>
            <div>
                <p>Min: {formatTemperature(weather.main.temp_min)}&deg;C</p>
                <p>Max: {formatTemperature(weather.main.temp_max)}&deg;C</p>
            </div>
        </div>
    )
}