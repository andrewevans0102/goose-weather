import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherData } from 'src/app/models/weather-data/weather-data';
import { Store, select } from '@ngrx/store';
import { AppState, selectWeather } from 'src/app/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weekly-forecast',
  templateUrl: './weekly-forecast.component.html',
  styleUrls: ['./weekly-forecast.component.css']
})
export class WeeklyForecastComponent implements OnInit {

  data$: Observable<WeatherData>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.data$ = this.store.pipe(select(selectWeather));
  }

}
