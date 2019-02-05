import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { WeatherData } from 'src/app/models/weather-data/weather-data';

const EXAMPLE_DATA = [
  {day: '2:00 PM', description: 'AM Snow Showers', high: '27', low: '20', precip: '90%', wind: 'ENE 7MPH', humidity: '72%'},
  {day: '3:00 PM', description: 'AM Snow Showers', high: '27', low: '20', precip: '90%', wind: 'ENE 7MPH', humidity: '72%'},
  {day: '4:00 PM', description: 'AM Snow Showers', high: '27', low: '20', precip: '90%', wind: 'ENE 7MPH', humidity: '72%'},
  {day: '5:00 PM', description: 'AM Snow Showers', high: '27', low: '20', precip: '90%', wind: 'ENE 7MPH', humidity: '72%'},
  {day: '6:00 PM', description: 'AM Snow Showers', high: '27', low: '20', precip: '90%', wind: 'ENE 7MPH', humidity: '72%'},
  {day: '5:00 PM', description: 'AM Snow Showers', high: '27', low: '20', precip: '90%', wind: 'ENE 7MPH', humidity: '72%'},
  {day: '6:00 PM', description: 'AM Snow Showers', high: '27', low: '20', precip: '90%', wind: 'ENE 7MPH', humidity: '72%'},
  {day: '5:00 PM', description: 'AM Snow Showers', high: '27', low: '20', precip: '90%', wind: 'ENE 7MPH', humidity: '72%'},
  {day: '6:00 PM', description: 'AM Snow Showers', high: '27', low: '20', precip: '90%', wind: 'ENE 7MPH', humidity: '72%'},
  {day: '5:00 PM', description: 'AM Snow Showers', high: '27', low: '20', precip: '90%', wind: 'ENE 7MPH', humidity: '72%'},
  {day: '6:00 PM', description: 'AM Snow Showers', high: '27', low: '20', precip: '90%', wind: 'ENE 7MPH', humidity: '72%'},
  {day: '8:00 PM', description: 'AM Snow Showers', high: '27', low: '20', precip: '90%', wind: 'ENE 7MPH', humidity: '72%'}
];

@Component({
  selector: 'app-weather-hourly',
  templateUrl: './weather-hourly.component.html',
  styleUrls: ['./weather-hourly.component.css']
})
export class WeatherHourlyComponent implements OnInit {

  data = new WeatherData();

  @Input()
  set weatherData(weatherData: WeatherData) {
    this.data = weatherData || null;
  }

  dataSource = EXAMPLE_DATA;
  hours = EXAMPLE_DATA;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['day', 'description', 'high', 'low', 'precip', 'wind', 'humidity'];
  // displayedColumns = ['day', 'description', 'high', 'low', 'wind', 'humidity'];

  encapsulation: ViewEncapsulation.None;

  constructor() { }

  ngOnInit() {

  }

}
