import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { WeatherService } from '../weather/weather.service';
import { City } from '../profile/city';
import { Profile } from '../profile/profile';
import { WeatherItem } from '../weather/item/weather-item';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor,CommonModule],
  providers:[ProfileService,WeatherService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  profiles:Profile[]=[]
  constructor(private _profileService:ProfileService, private _weatherService:WeatherService) {}

  onSaveNewProfile() {
    const cities:City[] = this._weatherService.getWeatherItems().map((element:any):City=> ({cityName: element.city}))
    if (cities.length) {
        this._profileService.saveNewProfile(cities);
    }
  }

  onLoadProfile(profile: Profile):void {
    this._weatherService.clearWeatherItems();
    for (let i = 0; i < profile.cities.length; i++) {
        this._weatherService.searchWeatherInfo(profile.cities[i].cityName)
            .subscribe(
                data => {
                  console.log(data);
                    let cityName: string = data.city;
                    let temperature: number = data.temperature;
                    let temperatureC: number = data.temperatureC;
                    let temperatureF = data.temperatureF;
                    const weatherItem = new WeatherItem(cityName, temperature, temperatureC, temperatureF);
                    // console.log("yaha");
                    
                    // console.log(weatherItem)
                    this._weatherService.addWeatherItem(weatherItem);
                }
            );
    }

  }

  onDeleteProfile(event: any, profile: Profile):void {
    event.stopPropagation();
    this._profileService.deleteProfile(profile);
}

  ngOnInit():any {
    this.profiles = this._profileService.getProfiles();
  }
}
