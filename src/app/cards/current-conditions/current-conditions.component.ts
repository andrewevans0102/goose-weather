import { Component, OnInit, Input } from '@angular/core';
import { WeatherData } from 'src/app/models/weather-data/weather-data';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit {

  data: WeatherData;

  @Input()
  set weatherData(weatherData: WeatherData) {
    this.data = weatherData || null;
  }

  constructor() { }

  ngOnInit(): void {

  }

}
