import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WeatherItem } from "./item/weather-item";


@Injectable()
export class WeatherService {
    constructor(private _http:HttpClient) {}

    getWeatherItems() {
        let data=localStorage.getItem("WEATHER_ITEMS");
        let WEATHER_ITEMS=[]
        if(data!=null) {
            WEATHER_ITEMS=JSON.parse(data);
        }
        return WEATHER_ITEMS;
    }
    
    addWeatherItem(item: WeatherItem) {
        let weatherItems=localStorage.getItem("WEATHER_ITEMS");
        let WEATHER_ITEMS:any;
        if(weatherItems!=null) {
            WEATHER_ITEMS=JSON.parse(weatherItems);
        }
        else WEATHER_ITEMS=[]

        WEATHER_ITEMS.push(item);
        // localStorage.setItem('WEATHER_ITEMS',WEATHER_ITEMS)
        console.log("ADD WALA"+WEATHER_ITEMS)
        localStorage.setItem('WEATHER_ITEMS',JSON.stringify(WEATHER_ITEMS))
    }
    
    clearWeatherItems() {
        localStorage.clear();
    }

    deleteWeatherItem(item: WeatherItem) {
        let weatherItems=localStorage.getItem("WEATHER_ITEMS");
        let WEATHER_ITEMS:any;
        if(weatherItems!=null) {
            WEATHER_ITEMS=JSON.parse(weatherItems);
        }
        WEATHER_ITEMS.splice(WEATHER_ITEMS.indexOf(item), 1);
        localStorage.setItem('WEATHER_ITEMS',JSON.stringify(WEATHER_ITEMS))
        return null;
    }

    isExistWeatherItem(item: WeatherItem): boolean {
        let data=localStorage.getItem("WEATHER_ITEMS");
        if(data==null) return false;
        let WEATHER_ITEMS:WeatherItem[]=JSON.parse(data);
        return WEATHER_ITEMS.some(elem=> (elem.city == item.city && elem.city == item.city));
    }

    searchWeatherInfo(city: string): Observable<any> {
        const options = {
            method: 'GET',
            url: `https://cities-temperature.p.rapidapi.com/weather/v1?city=${city}`,
            params: {city: 'Indore'},
            headers: {
              'X-RapidAPI-Key': 'bb1c3ff085msh35b4652fa964629p127017jsn2bb41aa48dde',
              'X-RapidAPI-Host': 'cities-temperature.p.rapidapi.com'
            }
          };
          
          const res=this._http.get(options.url, { headers: options.headers });
          
        //   console.log(res.forEach(val => console.log(val)))
          return res;
    }
}