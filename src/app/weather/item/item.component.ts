import { Component, Input } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { WeatherItem } from './weather-item';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [ListComponent],
  providers:[WeatherService],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  @Input('weatherItem') item!:WeatherItem;

  constructor(private _weatherService:WeatherService) {
  }
  onDeleteItem(event:any,weatherItem:WeatherItem) {
    event.stopPropogation();
    this._weatherService.deleteWeatherItem(weatherItem)
  }
}
