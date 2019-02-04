import { Component, OnInit } from '@angular/core';

export interface WeatherWeekItem {
  day: string;
  description: string;
  high: string;
  low: string;
  precip: string;
  wind: string;
  humidity: string;
}

const EXAMPLE_DATA: WeatherWeekItem[] = [
  {day: 'Today', description: 'AM Snow Showers', high: '27', low: '20', precip: '90%', wind: 'ENE 7MPH', humidity: '72%'},
  {day: 'SAT', description: 'AM Snow Showers', high: '27', low: '20', precip: '90%', wind: 'ENE 7MPH', humidity: '72%'},
  {day: 'SUN', description: 'AM Snow Showers', high: '27', low: '20', precip: '90%', wind: 'ENE 7MPH', humidity: '72%'},
  {day: 'MON', description: 'AM Snow Showers', high: '27', low: '20', precip: '90%', wind: 'ENE 7MPH', humidity: '72%'},
  {day: 'TUE', description: 'AM Snow Showers', high: '27', low: '20', precip: '90%', wind: 'ENE 7MPH', humidity: '72%'}
];

@Component({
  selector: 'app-weather-week',
  templateUrl: './weather-week.component.html',
  styleUrls: ['./weather-week.component.css']
})
export class WeatherWeekComponent implements OnInit {

  displayedColumns = ['day', 'description', 'high', 'low', 'precip', 'wind', 'humidity'];

  dataSource = EXAMPLE_DATA;

  constructor() { }

  ngOnInit() {

  }
}
