import axios from 'axios'
// import { z } from 'zod'
import { object, string, number, InferOutput, parse } from 'valibot'
import { SearchType } from '../types';

// Type Guard or Assertions
// Type Guards are functions that return a boolean value indicating whether the provided value is of a specific type.
// function isWeatherResponse(weather: unknown) : weather is Weather {
//     return (
//         Boolean(weather) &&
//         typeof weather === 'object' &&
//         typeof (weather as Weather).name === 'string' &&
//         typeof (weather as Weather).main.temp === 'number' &&
//         typeof (weather as Weather).main.temp_min === 'number' &&
//         typeof (weather as Weather).main.temp_max === 'number'
//     )
// }

// Zod Schema
// const Weather = z.object({
//     name: z.string(),
//     main: z.object({
//         temp: z.number(),
//         temp_min: z.number(),
//         temp_max: z.number()
//     })
// })
// type Weather = z.infer<typeof Weather>

// Valibot Schema
const WeatherSchema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_min: number(),
        temp_max: number()
    })
})
type Weather = InferOutput<typeof WeatherSchema>

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
            // const { data: weatherResult } = await axios<Weather>(weatherUrl)
            // const result = isWeatherResponse(weatherResult)
            // if (result) {
            //     console.log(weatherResult.name)
            //     console.log(weatherResult.main.temp)
            // } else {
            //     console.log('Invalid weather data')
            // }

            // Zod
            // const { data: weatherResult } = await axios(weatherUrl)
            // const result = Weather.safeParse(weatherResult)
            // if (result.success) {
            //     console.log(result.data.name)
            //     console.log(result.data.main.temp)
            // } else {
            //     console.log('Invalid weather data')
            // }

            // Valibot
            const { data: weatherResult } = await axios(weatherUrl)
            const result = parse(WeatherSchema, weatherResult)
            if (result) {
                console.log(result)
            }

        } catch (error) {
            console.log(error);
        }
    }

    return {
        fetchWeather
    }
}
