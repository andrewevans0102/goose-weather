import { Component, OnInit, Input } from '@angular/core';
import { WeatherDisplay } from 'src/app/models/weather-display';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit {

  @Input() _weatherDisplay = new WeatherDisplay();

  tiles: Tile[] = [
    // {text: 'Latitude: ' + this._weatherDisplay.latitude, cols: 2, rows: 1, color: 'lightblue'},
    // {text: 'Longitude: ' + this._weatherDisplay.longitude, cols: 2, rows: 1, color: 'lightblue'},
    // {text: 'City: ' + this._weatherDisplay.currentLocation, cols: 2, rows: 1, color: 'lightblue'},
    // {text: 'State: ' + this.weatherDisplay.currentLocation, cols: 2, rows: 1, color: 'lightblue'},
    // {text: 'Temp: ' + this._weatherDisplay.currentTemperature, cols: 2, rows: 1, color: 'lightblue'},
    // {text: 'image', cols: 2, rows: 2, color: 'lightblue'},
    // {text: 'Sunrise: ' + this._weatherDisplay.sunrise, cols: 1, rows: 1, color: 'lightblue'},
    // {text: 'Sunset: ' + this.weatherDisplay.sunset, cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Humidity: NEED TO ADD ', cols: 2, rows: 1, color: 'lightblue'},
    {text: 'Wind: NEED TO ADD', cols: 2, rows: 1, color: 'lightblue'}
  ];

  @Input()
  set weatherDisplay(weatherDisplay: WeatherDisplay) {
    this._weatherDisplay = weatherDisplay || null;
    console.log(this._weatherDisplay);
  }

  constructor() { }

  ngOnInit() {
  }

}
