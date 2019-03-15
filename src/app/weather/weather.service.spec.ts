import { TestBed, async } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../reducers';
import { LocationData } from '../models/location-data/location-data';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

describe('WeatherService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let weatherService: WeatherService;
  const currentConditions: any = require('../../testing/current-conditions.json');
  const metadata: any = require('../../testing/metadata.json');
  const hourlyForecast: any = require('../../testing/hourly-forecast.json');
  const weeklyForecast: any = require('../../testing/weekly-forecast.json');
  const locationData: LocationData = {
    latitude: '37.6585',
    longitude: '-77.6526'
  };
  const hourlyForecastURL = 'https://api.weather.gov/gridpoints/AKQ/36,80/forecast/hourly';
  const metadataURL = 'https://api.weather.gov/points/37.6585,-77.6526';
  const weeklyForecastURL = 'https://api.weather.gov/gridpoints/AKQ/36,80/forecast';

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule,
      StoreModule.forRoot(reducers, { metaReducers })
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    weatherService = TestBed.get(WeatherService);
  });

  it('should be created', () => {
    expect(weatherService).toBeTruthy();
  });

  it('retrieves weather', async(() => {
    spyOn(weatherService, 'getNoaaMetadata').and.returnValue(of(metadata));
    spyOn(weatherService, 'getNoaaWeeklyForecast').and.returnValue(of(weeklyForecast));
    spyOn(weatherService, 'getNoaaHourlyForecast').and.returnValue(of(hourlyForecast));
    spyOn(weatherService, 'getCurrentWeatherOpenWeatherMapAPI').and.returnValue(of(currentConditions));
    weatherService.getWeather(locationData).subscribe(result => expect(result.NoaaWeeklyForecastUrl)
      .toEqual('https://api.weather.gov/gridpoints/AKQ/36,80/forecast'));
  }));

  it('current conditions open weather map api call successful', async(() => {
    const APIKey = environment.openWeatherMapAPIKey;
    const units = 'imperial';
    const openWeatherMapAPIURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' +
      locationData.latitude + '&lon=' + locationData.longitude + '&units=' + units + '&appid=' + APIKey;
    weatherService.getCurrentWeatherOpenWeatherMapAPI(locationData)
      .subscribe(result => expect(result).toEqual(currentConditions));

    const req = httpTestingController.expectOne(openWeatherMapAPIURL);
    expect(req.request.method).toEqual('GET');
    req.flush(currentConditions);
    httpTestingController.verify();
  }));

  it('current conditions open weather map api call unsuccessful', async(() => {
    const APIKey = environment.openWeatherMapAPIKey;
    const units = 'imperial';
    const emptyLocation: LocationData = {
      longitude: '0',
      latitude: '0'
    };
    const openWeatherMapAPIURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' +
      emptyLocation.latitude + '&lon=' + emptyLocation.longitude + '&units=' + units + '&appid=' + APIKey;
    weatherService.getCurrentWeatherOpenWeatherMapAPI(emptyLocation)
      .subscribe(
        () => {
          fail('expected error');
        },
        (error) => {
          expect(error).toBe('error when retrieving current conditions');
        });

    const req = httpTestingController.expectOne(openWeatherMapAPIURL);
    const mockError = new ErrorEvent('Network error', {
      message: 'error when retrieving current conditions'
    });
    req.error(mockError);
    httpTestingController.verify();
  }));

  it('noaa metatdata call successful', async(() => {
    weatherService.getNoaaMetadata(locationData)
      .subscribe(result => expect(result).toEqual(metadata));

    const req = httpTestingController.expectOne(metadataURL);
    expect(req.request.method).toEqual('GET');
    req.flush(metadata);
    httpTestingController.verify();
  }));

  it('noaa metatdata call unsuccessful', async(() => {
    const locationEmpty: LocationData = {
      longitude: '0',
      latitude: '0'
    };
    const metadataURLEmpty = 'https://api.weather.gov/points/' + locationEmpty.latitude + ',' + locationEmpty.longitude;
    weatherService.getNoaaMetadata(locationEmpty)
      .subscribe(
      () => {
        fail('expected error');
      },
      (error) => {
        expect(error).toBe('error when retrieving weather metadata');
      });

    const req = httpTestingController.expectOne(metadataURLEmpty);
    const mockError = new ErrorEvent('Network error', {
      message: 'error when retrieving weather metadata'
    });
    req.error(mockError);
    httpTestingController.verify();
  }));

  it('noaa hourly forecast call successful', async(() => {
    weatherService.getNoaaHourlyForecast(hourlyForecastURL)
      .subscribe(result => expect(result).toEqual(hourlyForecast));

    const req = httpTestingController.expectOne(hourlyForecastURL);
    expect(req.request.method).toEqual('GET');
    req.flush(hourlyForecast);
    httpTestingController.verify();
  }));

  it('noaa hourly forecast call unsuccessful', async(() => {
    const emptyForecastURL = 'zzzz' + hourlyForecastURL;
    weatherService.getNoaaHourlyForecast(emptyForecastURL)
    .subscribe(
      () => {
        fail('expected error');
      },
      (error) => {
        expect(error).toBe('error when retrieving hourly forecast');
      });

    const req = httpTestingController.expectOne(emptyForecastURL);
    const mockError = new ErrorEvent('Network error', {
      message: 'error when retrieving hourly forecast'
    });
    req.error(mockError);
    httpTestingController.verify();
  }));

  it('noaa weekly forecast call successful', async(() => {
    weatherService.getNoaaWeeklyForecast(weeklyForecastURL)
      .subscribe(result => expect(result).toEqual(weeklyForecast));

    const req = httpTestingController.expectOne(weeklyForecastURL);
    expect(req.request.method).toEqual('GET');
    req.flush(weeklyForecast);
    httpTestingController.verify();
  }));

  it('noaa weekly forecast call successful', async(() => {
    weatherService.getNoaaWeeklyForecast(weeklyForecastURL + 'zzzz')
      .subscribe(
        () => {
          fail('expected error');
        },
        (error) => {
          expect(error).toBe('error when retrieving weekly forecast');
        });

    const req = httpTestingController.expectOne(weeklyForecastURL + 'zzzz');
    expect(req.request.method).toEqual('GET');
    const mockError = new ErrorEvent('Network error', {
      message: 'error when retrieving weekly forecast'
    });
    req.error(mockError);
    httpTestingController.verify();
  }));

  it('select current condtions icon all values', () => {
    let selectedImage = weatherService.selectCurrentConditionsIcon('01d');
    expect(selectedImage).toBe('./assets/sun.svg');
    selectedImage = weatherService.selectCurrentConditionsIcon('01n');
    expect(selectedImage).toBe('./assets/clear_sky_night.png');
    selectedImage = weatherService.selectCurrentConditionsIcon('02d');
    expect(selectedImage).toBe('./assets/clouds.svg');
    selectedImage = weatherService.selectCurrentConditionsIcon('02n');
    expect(selectedImage).toBe('./assets/few_clouds_night.png');
    selectedImage = weatherService.selectCurrentConditionsIcon('03d');
    expect(selectedImage).toBe('./assets/clouds.svg');
    selectedImage = weatherService.selectCurrentConditionsIcon('03n');
    expect(selectedImage).toBe('./assets/few_clouds_night.png');
    selectedImage = weatherService.selectCurrentConditionsIcon('04d');
    expect(selectedImage).toBe('./assets/clouds.svg');
    selectedImage = weatherService.selectCurrentConditionsIcon('04n');
    expect(selectedImage).toBe('./assets/few_clouds_night.png');
    selectedImage = weatherService.selectCurrentConditionsIcon('09d');
    expect(selectedImage).toBe('./assets/shower_rain_day.png');
    selectedImage = weatherService.selectCurrentConditionsIcon('09n');
    expect(selectedImage).toBe('./assets/shower_rain_night.png');
    selectedImage = weatherService.selectCurrentConditionsIcon('10d');
    expect(selectedImage).toBe('./assets/shower_rain_day.png');
    selectedImage = weatherService.selectCurrentConditionsIcon('10n');
    expect(selectedImage).toBe('./assets/shower_rain_night.png');
    selectedImage = weatherService.selectCurrentConditionsIcon('11d');
    expect(selectedImage).toBe('./assets/shower_rain_day.png');
    selectedImage = weatherService.selectCurrentConditionsIcon('11n');
    expect(selectedImage).toBe('./assets/shower_rain_night.png');
    selectedImage = weatherService.selectCurrentConditionsIcon('13d');
    expect(selectedImage).toBe('./assets/snow.png');
    selectedImage = weatherService.selectCurrentConditionsIcon('13n');
    expect(selectedImage).toBe('./assets/snow.png');
    selectedImage = weatherService.selectCurrentConditionsIcon('50d');
    expect(selectedImage).toBe('./assets/fog_day.png');
    selectedImage = weatherService.selectCurrentConditionsIcon('50n');
    expect(selectedImage).toBe('./assets/fog_night.png');
    selectedImage = weatherService.selectCurrentConditionsIcon('default');
    expect(selectedImage).toBe('./assets/sun.svg');
  });

  it('select wind direction all values', () => {
    let windDirection = weatherService.getWindDirectionFromDegreeAngle(80);
    expect(windDirection).toBe('NE');
    windDirection = weatherService.getWindDirectionFromDegreeAngle(110);
    expect(windDirection).toBe('SE');
    windDirection = weatherService.getWindDirectionFromDegreeAngle(250);
    expect(windDirection).toBe('SW');
    windDirection = weatherService.getWindDirectionFromDegreeAngle(350);
    expect(windDirection).toBe('NW');
  });

});
