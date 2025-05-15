import axios from 'axios'
import { SearchType, Weather } from '../types';

// Type Guard or Assertions
// Type Guards are functions that return a boolean value indicating whether the provided value is of a specific type.
function isWeatherResponse(weather: unknown) : weather is Weather {
    return (
        Boolean(weather) &&
        typeof weather === 'object' &&
        typeof (weather as Weather).name === 'string' &&
        typeof (weather as Weather).main.temp === 'number' &&
        typeof (weather as Weather).main.temp_min === 'number' &&
        typeof (weather as Weather).main.temp_max === 'number'
    )
}

export default function useWeather() {

    const fetchWeather = async (search: SearchType) => {
        const apiKey = import.meta.env.VITE_API_KEY;
        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`
            const { data } = await axios(geoUrl);

            const lat = data[0].lat;
            const lon = data[0].lon;

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

            // Cast the type
            // const { data: weatherResult } = await axios<Weather>(weatherUrl)
            // console.log(weatherResult.name)
            // console.log(weatherResult.main.temp)

            // Type Guards
            const { data: weatherResult } = await axios<Weather>(weatherUrl)
            const result = isWeatherResponse(weatherResult)
            if (result) {
                console.log(weatherResult.name)
                console.log(weatherResult.main.temp)
            } else {
                console.log('Invalid weather data')
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return {
        fetchWeather
    }
}
