import { Component, OnInit, Input } from '@angular/core';
import { WeatherData } from 'src/app/models/weather-data/weather-data';

@Component({
  selector: 'app-weekly-forecast',
  templateUrl: './weekly-forecast.component.html',
  styleUrls: ['./weekly-forecast.component.css']
})
export class WeeklyForecastComponent implements OnInit {

  data: WeatherData;

  @Input()
  set weatherData(weatherData: WeatherData) {
    this.data = weatherData || null;
  }

  constructor() { }

  ngOnInit(): void {

  }

}
