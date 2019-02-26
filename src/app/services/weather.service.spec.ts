import { TestBed, async, inject } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { HttpClientModule } from '@angular/common/http';
import { LocationData } from '../models/location-data/location-data';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { WeatherData } from '../models/weather-data/weather-data';
import { environment } from 'src/environments/environment';

describe('WeatherService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const currentConditions: any = require('../../testing/current-conditions.json');
  const metadata: any = require('../../testing/metadata.json');
  const hourlyForecast: any = require('../../testing/hourly-forecast.json');
  const weeklyForecast: any = require('../../testing/weekly-forecast.json');

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule
    ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: WeatherService = TestBed.get(WeatherService);
    expect(service).toBeTruthy();
  });

  it('retrieves weather', async(inject( [WeatherService], ( weatherService ) => {
    const locationData: LocationData = {
      latitude: '37.6585',
      longitude: '-77.6526'
    };
    spyOn(weatherService, 'getNoaaMetadata').and.returnValue(of(metadata));
    spyOn(weatherService, 'getNoaaWeeklyForecast').and.returnValue(of(weeklyForecast));
    spyOn(weatherService, 'getNoaaHourlyForecast').and.returnValue(of(hourlyForecast));
    spyOn(weatherService, 'getCurrentWeatherOpenWeatherMapAPI').and.returnValue(of(currentConditions));
    weatherService.getWeather(locationData).subscribe(result => expect(result.NoaaWeeklyForecastUrl)
      .toEqual('https://api.weather.gov/gridpoints/AKQ/36,80/forecast'));
  })));

  it('current conditions open weather map api call successful', async(inject( [WeatherService], ( weatherService ) => {
    const locationData: LocationData = {
      latitude: '37.6584',
      longitude: '-77.6526'
    };
    const APIKey = environment.openWeatherMapAPIKey;
    const units = 'imperial';
    const openWeatherMapAPIURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + locationData.latitude
      + '&lon=' + locationData.longitude + '&units=' + units + '&appid=' + APIKey;

    weatherService.getCurrentWeatherOpenWeatherMapAPI(locationData.latitude, locationData.longitude)
      .subscribe(result => expect(result).toEqual(currentConditions));

    const req = httpTestingController.expectOne(openWeatherMapAPIURL);
    expect(req.request.method).toEqual('GET');
    req.flush(currentConditions);
    httpTestingController.verify();
  })));

  it('noaa metatdata call successful', async(inject( [WeatherService], ( weatherService ) => {
    const locationData: LocationData = {
      latitude: '37.6585',
      longitude: '-77.6526'
    };
    const metadataURL = 'https://api.weather.gov/points/37.6585,-77.6526';

    weatherService.getNoaaMetadata(locationData.latitude, locationData.longitude)
      .subscribe(result => expect(result).toEqual(metadata));

    const req = httpTestingController.expectOne(metadataURL);
    expect(req.request.method).toEqual('GET');
    req.flush(metadata);
    httpTestingController.verify();
  })));

  it('noaa hourly forecast call successful', async(inject( [WeatherService], ( weatherService ) => {
    const locationData: LocationData = {
      latitude: '37.6585',
      longitude: '-77.6526'
    };
    const hourlyForecastURL = 'https://api.weather.gov/gridpoints/AKQ/36,80/forecast/hourly';

    weatherService.getNoaaHourlyForecast(hourlyForecastURL)
      .subscribe(result => expect(result).toEqual(hourlyForecast));

    const req = httpTestingController.expectOne(hourlyForecastURL);
    expect(req.request.method).toEqual('GET');
    req.flush(hourlyForecast);
    httpTestingController.verify();
  })));

  it('noaa weekly forecast call successful', async(inject( [WeatherService], ( weatherService ) => {
    const locationData: LocationData = {
      latitude: '37.6585',
      longitude: '-77.6526'
    };
    const weeklyForecastURL = 'https://api.weather.gov/gridpoints/AKQ/36,80/forecast';

    weatherService.getNoaaWeeklyForecast(weeklyForecastURL)
      .subscribe(result => expect(result).toEqual(weeklyForecast));

    const req = httpTestingController.expectOne(weeklyForecastURL);
    expect(req.request.method).toEqual('GET');
    req.flush(weeklyForecast);
    httpTestingController.verify();
  })));


});
