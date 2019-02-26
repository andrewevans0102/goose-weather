import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { WeatherData } from '../models/weather-data/weather-data';
import { WeeklyForecast } from '../models/weekly-forecast/weekly-forecast';
import { HourlyForecast } from '../models/hourly-forecast/hourly-forecast';
import { Observable, throwError, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { LocationData } from '../models/location-data/location-data';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherData: WeatherData = new WeatherData();

  constructor(private http: HttpClient) { }

  getWeather(locationData: LocationData): Observable<any> {
    return this.getNoaaMetadata(locationData.latitude, locationData.longitude)
      .pipe(
        mergeMap( metadata => this.getNoaaWeeklyForecast(metadata.properties.forecast)
          .pipe(
            mergeMap( weeklyForecast => this.getNoaaHourlyForecast(metadata.properties.forecastHourly)
              .pipe(
                mergeMap( hourlyForecast => this.getCurrentWeatherOpenWeatherMapAPI(locationData.latitude, locationData.longitude)
                  .pipe(
                    map((currentWeather) => {
                      // metadata
                      this.weatherData.currentConditions.latitude = locationData.latitude;
                      this.weatherData.currentConditions.longitude = locationData.longitude;
                      this.weatherData.currentConditions.city = metadata.properties.relativeLocation.properties.city;
                      this.weatherData.currentConditions.state = metadata.properties.relativeLocation.properties.state;
                      this.weatherData.NoaaWeeklyForecastUrl = metadata.properties.forecast;
                      this.weatherData.NoaaHourlyForecastUrl = metadata.properties.forecastHourly;

                      // weekly forecast
                      this.weatherData.weeklyForecast = this.createWeeklyForecastFromNoaaData(weeklyForecast.properties.periods);

                      // hourly forecast
                      this.weatherData.hourlyForecast = this.createHourlyForecastFromNoaaData(hourlyForecast.properties.periods);

                      // current conditions
                      this.weatherData.currentConditions.temp = String(Math.ceil(currentWeather.main.temp));
                      this.weatherData.currentConditions.description = currentWeather.weather[0].description;
                      this.weatherData.currentConditions.sunrise = this.createDateFromMillseconds(currentWeather.sys.sunrise);
                      this.weatherData.currentConditions.sunset = this.createDateFromMillseconds(currentWeather.sys.sunset);
                      this.weatherData.currentConditions.icon = this.selectCurrentConditionsIcon(currentWeather.weather[0].icon);
                      this.weatherData.currentConditions.windSpeed = currentWeather.wind.speed;
                      this.weatherData.currentConditions.windDirection = this.getWindDirectionFromDegreeAngle(currentWeather.wind.deg);

                      // save time that the weather was retrieved
                      this.weatherData.weatherDate = new Date();

                      return this.weatherData;
                    }))
                ))
            ))
        ));
  }

  getWeatherLocalStorage(): Observable<WeatherData> {
    const localStorageWeatherData: WeatherData = JSON.parse(window.localStorage.getItem('weather'));
    return of(localStorageWeatherData);
  }

  // method implementation copied from angular documentation
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // clientside
      console.error('An error occurred:', error.error.message);
    } else {
      // backend
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // custom error to be caught
    return throwError(
      'An error occured when calling APIs');
  }

  getWindDirectionFromDegreeAngle(degreeAngle: number): string {
    // Open Weather Map API returns an angle so where it falls in with cartesian quadrants is the direction here
    // helpful background is here https://en.wikipedia.org/wiki/Wind_direction
    let windDirection: string;
    if (degreeAngle >= 0 && degreeAngle < 90) {
      // first quadrant
      windDirection = 'NE';
    } else if (degreeAngle >= 90 && degreeAngle < 180) {
      // second quadrant
      windDirection = 'SE';
    } else if (degreeAngle >= 180 && degreeAngle < 270) {
      // second quadrant
      windDirection = 'SW';
    } else if (degreeAngle >= 270 && degreeAngle <= 360) {
      // second quadrant
      windDirection = 'NW';
    }

    return windDirection;
  }

  createDateFromMillseconds(milliseconds: number): string {
    // helpeful stackoverflow article here
    // https://stackoverflow.com/questions/8362952/output-javascript-date-in-yyyy-mm-dd-hhmsec-format
    // Note that time is Eastern Standard Format
    // Eastern Standard is 5 hours behind UTC
    const dMill = new Date(0);
    dMill.setUTCSeconds(milliseconds);
    let dateMinutes = '';
    let dateHours = '';
    let dateFormatted = '';

    // minutes
    dateMinutes = String(dMill.getUTCMinutes());
    if (dateMinutes.length < 2) {
      dateMinutes = '0' + dateMinutes;
    }

    // hours
    const hourNumber = dMill.getUTCHours() - 5;
    if (hourNumber > 12) {
      dateHours = String(hourNumber - 12);
    } else {
      dateHours = String(hourNumber);
    }
    if (dateHours.length < 2) {
      dateHours = '0' + dateHours;
    }

    if (hourNumber > 12) {
      dateFormatted = dateHours + ':' + dateMinutes + ' PM';
    } else {
      dateFormatted = dateHours + ':' + dateMinutes + ' AM';
    }

    return dateFormatted;
  }

  getNoaaMetadata(lat: string, long: string): Observable<any> {
    const noaaMetaDataEndpoint = environment.noaaMetaDataEndpoint;
    const metadataURL: string = noaaMetaDataEndpoint + lat + ',' + long;
    return this.http.get(metadataURL)
      .pipe(
        catchError(this.handleError)
      );
  }

  getNoaaHourlyForecast(hourlyURL): Observable<any> {
    return this.http.get(hourlyURL)
      .pipe(
        catchError(this.handleError)
      );
  }

  getNoaaWeeklyForecast(forecastURL): Observable<any> {
    return this.http.get(forecastURL)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCurrentWeatherOpenWeatherMapAPI(lat: string, long: string): Observable<any> {
    const APIKey = environment.openWeatherMapAPIKey;
    // default units are kelvin https://openweathermap.org/current
    // pass the unit imperial here to use Farenheit
    const units = 'imperial';
    const openWeatherMapAPIURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long
      + '&units=' + units + '&appid=' + APIKey;
    return this.http.get(openWeatherMapAPIURL)
      .pipe(
        catchError(this.handleError)
      );
  }

  selectCurrentConditionsIcon(iconAPI: string) {
    // official Open Weather Map API Icon Defintitions https://openweathermap.org/weather-conditions
    let conditionIcon = '';

    switch (iconAPI) {
      case '01d': {
        // clear sky day
        conditionIcon = './assets/sun.svg';
        break;
      }
      case '01n': {
        // clear sky night
        conditionIcon = './assets/clear_sky_night.png';
        break;
      }
      case '02d': {
        // few clouds day
        conditionIcon = './assets/clouds.svg';
        break;
      }
      case '02n': {
        // few clouds night
        conditionIcon = './assets/few_clouds_night.png';
        break;
      }
      case '03d': {
        // scattered clouds
        conditionIcon = './assets/clouds.svg';
        break;
      }
      case '03n': {
        // few clouds night
        conditionIcon = './assets/few_clouds_night.png';
        break;
      }
      case '04d': {
        // broken clouds
        conditionIcon = './assets/clouds.svg';
        break;
      }
      case '04n': {
        // few clouds night
        conditionIcon = './assets/few_clouds_night.png';
        break;
      }
      case '09d': {
        // shower rain day
        conditionIcon = './assets/shower_rain_day.png';
        break;
      }
      case '09n': {
        // shower rain night
        conditionIcon = './assets/shower_rain_night.png';
        break;
      }
      case '10d': {
        // shower rain day
        conditionIcon = './assets/shower_rain_day.png';
        break;
      }
      case '10n': {
        // shower rain night
        conditionIcon = './assets/shower_rain_night.png';
        break;
      }
      case '11d': {
        // shower rain day
        conditionIcon = './assets/shower_rain_day.png';
        break;
      }
      case '11n': {
        // shower rain night
        conditionIcon = './assets/shower_rain_night.png';
        break;
      }
      case '13d': {
        // snow day
        conditionIcon = './assets/snow.png';
        break;
      }
      case '13n': {
        // snow day
        conditionIcon = './assets/snow.png';
        break;
      }
      case '50d': {
        // fog day
        conditionIcon = './assets/fog_day.png';
        break;
      }
      case '50n': {
        // fog night
        conditionIcon = './assets/fog_night.png';
        break;
      }
      default: {
        // nothing found so just show the sun image here
        conditionIcon = './assets/sun.svg';
        break;
      }
    }

    return conditionIcon;
  }

  createWeeklyForecastFromNoaaData(periods: any): WeeklyForecast[] {
    const weeklyForecastTotal =  [];

    for (const period of periods) {
      const weeklyForecast = new WeeklyForecast();
      weeklyForecast.period = period.number;
      weeklyForecast.name = period.name;
      weeklyForecast.temp = period.temperature;
      weeklyForecast.windSpeed = period.windSpeed;
      weeklyForecast.windDirection = period.windDirection;
      weeklyForecast.icon = period.icon;
      weeklyForecast.shortForecast = period.shortForecast;
      weeklyForecast.detailedForecast = period.detailedForecast;
      weeklyForecastTotal.push(weeklyForecast);
    }

    return weeklyForecastTotal;
  }

  createHourlyForecastFromNoaaData(periods: any): HourlyForecast[] {
    const hourlyForecastTotal =  [];
    let counter = 0;
    for (const period of periods) {
      if (counter === 12) {
        // only show 12 hours
        break;
      }

      const hourlyForecast = new HourlyForecast();
      hourlyForecast.period = period.number;
      hourlyForecast.temp = period.temperature;
      hourlyForecast.windSpeed = period.windSpeed;
      hourlyForecast.windDirection = period.windDirection;
      hourlyForecast.icon = period.icon;
      // Time
      const startDate: Date = new Date(period.startTime);
      const hoursNumber = startDate.getHours();
      let hoursDisplay = '';
      if (hoursNumber > 12) {
        hoursDisplay = String(hoursNumber - 12);
      } else {
        hoursDisplay = String(hoursNumber);
      }
      if (hoursDisplay.length === 1) {
        hoursDisplay = 0 + hoursDisplay;
      }
      if (startDate.getHours() > 12) {
        hourlyForecast.time = hoursDisplay + ':00' + ' PM';
      } else {
        hourlyForecast.time = hoursDisplay + ':00' + ' AM';
      }

      hourlyForecastTotal.push(hourlyForecast);
      counter++;
    }

    return hourlyForecastTotal;
  }

}
