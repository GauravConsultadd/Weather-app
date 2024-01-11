import { Component, OnInit } from '@angular/core';
import { WeatherComponent } from '../weather.component';
import { WeatherService } from '../weather.service';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { WeatherItem } from '../item/weather-item';
import { Console } from 'console';

@Component({
  selector: 'app-search',
  standalone: true,
  providers:[WeatherService],
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  private searchStream = new Subject<string>();
  data:any = {};
  isCityFound:boolean = false;
  isSearching:boolean = false;
  
  constructor(private _weatherService:WeatherService) {}

  onSearchLocation(value:string): void {
    this.isSearching = true;
    this.searchStream.next(value);
  }

  onSubmit(f: NgForm) {
    let cityName: string = this.data.city;
    let temperature: number = this.data.temperature ? this.data.temperature : '';
    let temperatureC: number = this.data.temperatureC ? this.data.temperatureC : '';
    let temperatureF:number = this.data.temperatureF? this.data.temperatureF : '';
    console.log("onSubmit wala",cityName,temperature,temperatureC,temperatureF)

    const newItem = new WeatherItem(cityName, temperature, temperatureC, temperatureF);

      console.log("onSubmit wala yaha",cityName,temperature,temperatureC,temperatureF)
        this._weatherService.addWeatherItem(newItem);
        f.resetForm();
        window.location.reload()
}


  ngOnInit(): any {
    this.searchStream
    .pipe(debounceTime(500),distinctUntilChanged(),switchMap((term:string)=> this._weatherService.searchWeatherInfo(term))).subscribe(
      data => {
          if (data.name) {
              this.isCityFound = true;
          }
          else {
              this.isCityFound = false;
          }
          this.isSearching = false;
          return this.data = data;
      }
);
    
}
}
