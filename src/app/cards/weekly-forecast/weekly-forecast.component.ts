import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherData } from 'src/app/models/weather-data/weather-data';
import { Store, select } from '@ngrx/store';
import { AppState, selectWeather } from 'src/app/reducers';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-weekly-forecast',
  templateUrl: './weekly-forecast.component.html',
  styleUrls: ['./weekly-forecast.component.css']
})
export class WeeklyForecastComponent implements OnInit, OnDestroy {

  data: WeatherData;
  private unsubscribeWeather: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store
      .select(selectWeather)
      .pipe(takeUntil(this.unsubscribeWeather))
      .subscribe((weather) => this.data = weather);
  }

  ngOnDestroy() {
    this.unsubscribeWeather.next();
    this.unsubscribeWeather.complete();
  }

}
