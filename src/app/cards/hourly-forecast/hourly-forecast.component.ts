import { Component, OnInit } from '@angular/core';
import { WeatherData } from 'src/app/models/weather-data/weather-data';
import { Store, select } from '@ngrx/store';
import { AppState, selectWeather } from 'src/app/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.css']
})
export class HourlyForecastComponent implements OnInit {

  displayedColumns: string[] = ['Time', 'Temp', 'Wind', 'Condition'];

  data$: Observable<WeatherData>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.data$ = this.store.pipe(select(selectWeather));
  }

}
