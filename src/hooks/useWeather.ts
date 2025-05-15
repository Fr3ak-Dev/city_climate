import axios from 'axios'
import { SearchType, Weather } from '../types';

export default function useWeather() {

    const fetchWeather = async (search: SearchType) => {
        const apiKey = import.meta.env.VITE_API_KEY;
        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`
            const { data } = await axios(geoUrl);

            const lat = data[0].lat;
            const lon = data[0].lon;

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

            const { data: weatherData } = await axios<Weather>(weatherUrl)
            console.log(weatherData.name)
            console.log(weatherData.main.temp)
        } catch (error) {
            console.log(error);
        }
    }

    return {
        fetchWeather
    }
}
