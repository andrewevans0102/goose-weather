import { Component, OnInit, Input } from '@angular/core';
import { WeatherData } from 'src/app/models/weather-data/weather-data';
import { Tile } from 'src/app/models/tile/tile';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.scss']
})
export class CurrentConditionsComponent implements OnInit {

  data = new WeatherData();

  tiles: Tile[] = [
    {text: 'Latitude: ', cols: 2, rows: 1, color: 'lightblue'},
    {text: 'Longitude: ', cols: 2, rows: 1, color: 'lightblue'},
    {text: 'City: ', cols: 2, rows: 1, color: 'lightblue'},
    {text: 'State: ', cols: 2, rows: 1, color: 'lightblue'},
    {text: 'Temp: ', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Wind: ', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'image', cols: 2, rows: 2, color: 'lightblue'},
    {text: 'Sunrise: ', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Sunset: ', cols: 1, rows: 1, color: 'lightblue'}
  ];

  @Input()
  set weatherData(weatherData: WeatherData) {
    this.data = weatherData || null;
  }

  constructor() { }

  ngOnInit() {
  }

}
