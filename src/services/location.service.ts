import axios from 'axios';
import { LocationsOptions } from '../locationsOptions';
import { telAvivWeather } from '../telAvivWeather';
import { getDaysOfDailyForecasts } from '../daysOfDailyForecasts';
import { CurrentWeatherObj } from '../models/weather.model';

const API_KEY = 'EjKAgOHhI2MH8N5AeybQr3ObfyI5rflV';
const TEL_AVIV_LOCATION_KEY = '215854';


export class LocationService {

    static async getCurrentWeather(errorHandler: (err: string, description: string)=>void, locationKey?: string) {
        try {
            // const res = {data: telAvivWeather as CurrentWeatherObj[]}; //DEMO DATA
            const res = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey ?? TEL_AVIV_LOCATION_KEY}?apikey=${API_KEY}`)
            return res;
        } catch (err) {
            errorHandler(err, 'Faild to fetch Current weather data');
        }
    }

    static async getLocationsOptions(q: string, errorHandler: (err:string, description: string)=>void) {
        try {
            // const res = LocationsOptions as any; //DEMO DATA
            const res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${q}&language=en-us`)
            return res;
        } catch (err) {
            errorHandler(err, 'Faild to fetch locations options data');
        }
    }

    static async getDaysOfDailyForecasts(errorHandler: (err:string, description: string)=>void, locationKey?: string) {
        try {
            // const res = getDaysOfDailyForecasts as any; //DEMO DATA
            const res = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey ?? TEL_AVIV_LOCATION_KEY}?apikey=${API_KEY}`)
            return res;
        } catch (err) {
            errorHandler(err, 'Faild to fetch days of daily forecasts data');
        }
    }

}
