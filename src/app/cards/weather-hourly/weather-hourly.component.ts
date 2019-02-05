import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { WeatherData } from 'src/app/models/weather-data/weather-data';

@Component({
  selector: 'app-weather-hourly',
  templateUrl: './weather-hourly.component.html',
  styleUrls: ['./weather-hourly.component.css']
})
export class WeatherHourlyComponent implements OnInit {

  data = new WeatherData();

  @Input()
  set weatherData(weatherData: WeatherData) {
    this.data = weatherData || null;
  }

  encapsulation: ViewEncapsulation.None;

  constructor() { }

  ngOnInit() {

  }

}
