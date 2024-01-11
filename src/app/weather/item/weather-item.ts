export class WeatherItem {
    city:string
    temperature:Number
    temperatureC:Number
    temperatureF:Number


    constructor(city: string, temperature: number, temperatureC: number, temperatureF:number) {
        this.city = city;
        this.temperature = temperature;
        this.temperatureC = temperatureC;
        this.temperatureF = temperatureF;
    }
}