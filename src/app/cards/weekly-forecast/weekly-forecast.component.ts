import { Component, OnInit } from '@angular/core';
import { WeatherData } from 'src/app/models/weather-data/weather-data';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-weekly-forecast',
  templateUrl: './weekly-forecast.component.html',
  styleUrls: ['./weekly-forecast.component.css']
})
export class WeeklyForecastComponent implements OnInit {

  data: WeatherData;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store
      .subscribe(state => this.data = state.weather.weatherData);
  }

}
