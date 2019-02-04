// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { WeatherDisplay } from '../models/weather-display';
// import { environment } from '../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class WeatherService {

//   weatherDisplay: WeatherDisplay = new WeatherDisplay();

//   constructor(private http: HttpClient) { }

//   async getWeather(lat: string, long: string): Promise<WeatherDisplay> {
//     try {
//       const metadata: any = await this.getMetadata(lat, long);
//       if (metadata instanceof Error) {
//         throw metadata;
//       }
//       this.weatherDisplay.latitude = lat;
//       this.weatherDisplay.longitude = long;
//       const city = metadata['properties']['relativeLocation']['properties']['city'];
//       const state = metadata['properties']['relativeLocation']['properties']['state'];
//       this.weatherDisplay.currentLocation = city + ', ' + state;
//       this.weatherDisplay.forecastURL = metadata['properties']['forecast'];

//       const currentWeather = await this.getCurrentWeatherOpenWeatherMapAPI(lat, long);
//       if (currentWeather instanceof Error) {
//         throw currentWeather;
//       }
//       this.weatherDisplay.currentTemperature = String(Math.ceil(currentWeather['main']['temp']));
//       this.weatherDisplay.currentCondition = currentWeather['weather'][0]['description'];
//       this.weatherDisplay.sunrise = this.formatSunrise(currentWeather['sys']['sunrise']);
//       this.weatherDisplay.sunset = this.formatSunset(currentWeather['sys']['sunset']);

//       const detailedForecast = await this.getDetailedForecast(this.weatherDisplay.forecastURL);
//       if (detailedForecast instanceof Error) {
//         throw detailedForecast;
//       }
//       this.weatherDisplay.forecast = detailedForecast['properties']['periods'];
//     } catch (error) {
//       this.weatherDisplay.errorMessage = error.message;
//     }

//     return new Promise<WeatherDisplay>((resolve) => {
//       resolve(this.weatherDisplay);
//     });
//   }

//   formatSunrise(sunrise: number): string {
//       // TODO make this a common method for both sunrise and sunset
//       // helpeful stackoverflow article here https://stackoverflow.com/questions/8362952/output-javascript-date-in-yyyy-mm-dd-hhmsec-format
//       const dSunrise = new Date(0);
//       dSunrise.setUTCSeconds(sunrise);
//       let sunriseMinutes = String(dSunrise.getUTCMinutes());
//       if (sunriseMinutes.length < 2) {
//         sunriseMinutes = '0' + sunriseMinutes;
//       }
//       let sunriseHours = (String(dSunrise.getUTCHours() - 5));
//       if (sunriseHours.length < 2) {
//         sunriseHours = '0' + sunriseHours;
//       }
//       const sunriseFormatted = sunriseHours + ':' + sunriseMinutes;
//       return sunriseFormatted;
//   }

//   formatSunset(sunset: number): string {
//     const dSunset = new Date(0);
//     dSunset.setUTCSeconds(sunset);
//     let sunsetMinutes = String(dSunset.getUTCMinutes());
//     if (sunsetMinutes.length < 2) {
//       sunsetMinutes = '0' + sunsetMinutes;
//     }
//     let sunsetHours = (String(dSunset.getUTCHours() - 5));
//     if (sunsetHours.length < 2) {
//       sunsetHours = '0' + sunsetHours;
//     }
//     const sunriseFormatted = sunsetHours + ':' + sunsetMinutes;
//     return sunriseFormatted;
//   }

//   getMetadata(lat: string, long: string): Promise<any> {
//     const metadataURL: string = 'https://api.weather.gov/points/' + lat + ',' + long;
//     return this.http.get(metadataURL).toPromise()
//       .catch(() => new Error('error when calling metadataURL'));
//   }

//   getRadarStation(radarStationURL): Promise<any> {
//     return this.http.get(radarStationURL).toPromise()
//       .catch(() => new Error('error when calling radarStationURL'));
//   }

//   getLatestObservations(observationsURL): Promise<any> {
//     return this.http.get(observationsURL).toPromise()
//       .catch(() => new Error('error when calling observationsURL'));
//   }

//   getCurrentWeatherOpenWeatherMapAPI(lat: string, long: string) {
//     const APIKey = environment.openWeatherMapAPIKey;
//     // default units are kelvin https://openweathermap.org/current
//     // pass the unit imperial here to use Farenheit
//     const units = 'imperial';
//     const openWeatherMapAPIURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long
//       + '&units=' + units + '&appid=' + APIKey;
//     return this.http.get(openWeatherMapAPIURL).toPromise()
//       .catch(() => new Error('error when calling openWeatherMapURL'));
//   }

//   getHourlyForecast(hourlyURL): Promise<any> {
//     return this.http.get(hourlyURL).toPromise()
//       .catch(() => new Error('error when calling hourlyURL'));
//   }

//   getDetailedForecast(forecastURL): Promise<any> {
//     return this.http.get(forecastURL).toPromise()
//       .catch(() => new Error('error when calling forecastURL'));
//   }
// }
