import axios from 'axios';
const API_KEY = '3163660e55591e48bebbd91b01176891';


export const fetchWeather = async (URL, query) => {
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
        }
    });

    return data;
}