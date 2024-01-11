import { Component, OnInit } from '@angular/core';
import { WeatherItem } from '../item/weather-item';
import { WeatherService } from '../weather.service';
import { ItemComponent } from '../item/item.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ItemComponent,NgForOf],
  providers:[WeatherService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  weatherItems: WeatherItem[]=[];

    constructor(private _weatherService: WeatherService) {}

    ngOnInit():any {
        this.weatherItems = this._weatherService.getWeatherItems();
        console.log(this.weatherItems);
    }

}
