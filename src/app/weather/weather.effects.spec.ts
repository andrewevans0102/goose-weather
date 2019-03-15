import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { WeatherEffects } from './weather.effects';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../reducers';
import { HttpClientModule } from '@angular/common/http';

describe('WeatherEffects', () => {
  const actions$: Observable<any> = new Observable<any>();
  let effects: WeatherEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        HttpClientModule
      ],
      providers: [
        WeatherEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(WeatherEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
