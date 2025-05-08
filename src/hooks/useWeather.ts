import axios from 'axios'
import { SearchType } from '../types';

export default function useWeather() {

    const fetchWeather = async (search: SearchType) => {
        const apiKey = '4d1c3e0ab7de35719e59bd89284356ab'
        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`
            const { data } = await axios(geoUrl);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return {
        fetchWeather
    }
}
