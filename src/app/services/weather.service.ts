import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { WeatherData } from '../models/weather-data/weather-data';
import { WeeklyForecast } from '../models/weekly-forecast/weekly-forecast';
import { HourlyForecast } from '../models/hourly-forecast/hourly-forecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherData: WeatherData = new WeatherData();

  constructor(private http: HttpClient) { }

  async getWeather(lat: string, long: string): Promise<WeatherData> {
    try {
      const metadata: any = await this.getNoaaMetadata(lat, long);
      if (metadata instanceof Error) {
        throw metadata;
      }
      this.weatherData.currentConditions.latitude = lat;
      this.weatherData.currentConditions.longitude = long;
      this.weatherData.currentConditions.city = metadata.properties.relativeLocation.properties.city;
      this.weatherData.currentConditions.state = metadata.properties.relativeLocation.properties.state;
      this.weatherData.NoaaWeeklyForecastUrl = metadata.properties.forecast;
      this.weatherData.NoaaHourlyForecastUrl = metadata.properties.forecastHourly;

      const currentWeather: any = await this.getCurrentWeatherOpenWeatherMapAPI(lat, long);
      if (currentWeather instanceof Error) {
        throw currentWeather;
      }
      this.weatherData.currentConditions.temp = String(Math.ceil(currentWeather.main.temp));
      this.weatherData.currentConditions.description = currentWeather.weather[0].description;
      this.weatherData.currentConditions.sunrise = this.createDateFromMillseconds(currentWeather.sys.sunrise);
      this.weatherData.currentConditions.sunset = this.createDateFromMillseconds(currentWeather.sys.sunset);
      this.weatherData.currentConditions.icon = this.selectCurrentConditionsIcon(currentWeather.weather[0].icon);
      this.weatherData.currentConditions.windDirection = this.getWindDirectionFromDegreeAngle(currentWeather.wind.speed);

      const weeklyForecast: any = await this.getNoaaWeeklyForecast(this.weatherData.NoaaWeeklyForecastUrl);
      if (weeklyForecast instanceof Error) {
        throw weeklyForecast;
      }
      this.weatherData.weeklyForecast = this.createWeeklyForecastFromNoaaData(weeklyForecast.properties.periods);

      const hourlyForecast: any = await this.getNoaaHourlyForecast(this.weatherData.NoaaHourlyForecastUrl);
      if (hourlyForecast instanceof Error) {
        throw hourlyForecast;
      }
      this.weatherData.hourlyForecast = this.createHourlyForecastFromNoaaData(hourlyForecast.properties.periods);

      // save time that the weather was retrieved
      this.weatherData.weatherDate = new Date();
    } catch (error) {
      this.weatherData.errorMessage = error.message;
    }

    return new Promise<WeatherData>((resolve) => {
      resolve(this.weatherData);
    });
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
    let dateMinutes = String(dMill.getUTCMinutes());
    if (dateMinutes.length < 2) {
      dateMinutes = '0' + dateMinutes;
    }
    let dateHours = (String(dMill.getUTCHours() - 5));
    if (dateHours.length < 2) {
      dateHours = '0' + dateHours;
    }
    const dateFormatted = dateHours + ':' + dateMinutes;
    return dateFormatted;
  }

  getNoaaMetadata(lat: string, long: string): Promise<any> {
    const noaaMetaDataEndpoint = environment.noaaMetaDataEndpoint;
    const metadataURL: string = noaaMetaDataEndpoint + lat + ',' + long;
    return this.http.get(metadataURL).toPromise()
      .catch(() => new Error('error when calling metadataURL'));
  }

  getNoaaHourlyForecast(hourlyURL): Promise<any> {
    return this.http.get(hourlyURL).toPromise()
      .catch(() => new Error('error when calling hourlyURL'));
  }

  getNoaaWeeklyForecast(forecastURL): Promise<any> {
    return this.http.get(forecastURL).toPromise()
      .catch(() => new Error('error when calling forecastURL'));
  }

  getCurrentWeatherOpenWeatherMapAPI(lat: string, long: string) {
    const APIKey = environment.openWeatherMapAPIKey;
    // default units are kelvin https://openweathermap.org/current
    // pass the unit imperial here to use Farenheit
    const units = 'imperial';
    const openWeatherMapAPIURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long
      + '&units=' + units + '&appid=' + APIKey;
    return this.http.get(openWeatherMapAPIURL).toPromise()
      .catch(() => new Error('error when calling openWeatherMapURL'));
  }

  selectCurrentConditionsIcon(iconAPI: string) {
    // official Open Weather Map API Icon Defintitions https://openweathermap.org/weather-conditions
    let conditionIcon = '';

    switch (iconAPI) {
      case '01d' || '01n' || '50d' || '50n': {
        // clear sky day
        conditionIcon = './assets/sun.svg';
        break;
      }
      case '02d' || '02n' || '03d' || '03n' || '04d' || '04n': {
        // few clouds day
        conditionIcon = './assets/clouds.svg';
        break;
      }
      case '09d' || '09n' || '10d' || '10n' || '11d' || '11n': {
        // shower rain day
        conditionIcon = './assets/rain.svg';
        break;
      }
      case '13d' || '13n': {
        // snow day
        conditionIcon = './assets/snow.svg';
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
      let hours = (startDate.getHours()).toString();
      if (hours.length === 1) {
        hours = 0 + hours;
      }
      hourlyForecast.time = hours + ':00';
      hourlyForecastTotal.push(hourlyForecast);
      counter++;
    }

    return hourlyForecastTotal;
  }

}
