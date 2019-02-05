import { Component, OnInit, Input } from '@angular/core';
import { WeatherData } from 'src/app/models/weather-data/weather-data';
import { ViewEncapsulation } from '@angular/compiler/src/core';

@Component({
  selector: 'app-weather-week',
  templateUrl: './weather-week.component.html',
  styleUrls: ['./weather-week.component.css']
})
export class WeatherWeekComponent implements OnInit {

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
