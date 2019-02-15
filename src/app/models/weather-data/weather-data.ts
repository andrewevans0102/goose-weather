import { CurrentConditions } from '../current-conditions/current-conditions';
import { HourlyForecast } from '../hourly-forecast/hourly-forecast';
import { WeeklyForecast } from '../weekly-forecast/weekly-forecast';

export class WeatherData {
  forecastURL = '';
  forecast: {};
  currentConditions: CurrentConditions = new CurrentConditions();
  weeklyForecast: WeeklyForecast[] = [];
  hourlyForecast: HourlyForecast[] = [];
  NoaaWeeklyForecastUrl = '';
  NoaaHourlyForecastUrl = '';
  errorMessage = '';
  weatherDate: Date = new Date();
}
