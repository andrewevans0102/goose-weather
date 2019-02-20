import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherData } from 'src/app/models/weather-data/weather-data';
import { Store } from '@ngrx/store';
import { AppState, selectWeather } from 'src/app/reducers';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit, OnDestroy {

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
