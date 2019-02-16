import { Component, OnInit } from '@angular/core';
import { WeatherData } from 'src/app/models/weather-data/weather-data';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.css']
})
export class HourlyForecastComponent implements OnInit {

  data: WeatherData;
  displayedColumns: string[] = ['Time', 'Temp', 'Wind', 'Condition'];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store
      .subscribe(state => this.data = state.weather.weatherData);
  }

}
