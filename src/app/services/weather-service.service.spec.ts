import { TestBed } from '@angular/core/testing';

import { WeatherServiceService } from './weather-service.service';

describe('WeatherServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherServiceService = TestBed.get(WeatherServiceService);
    expect(service).toBeTruthy();
  });
});
