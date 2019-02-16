import { Component, OnInit } from '@angular/core';
import { WeatherData } from 'src/app/models/weather-data/weather-data';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit {

  data:WeatherData;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store
      .subscribe(state => this.data = state.weather.weatherData);
  }

}
