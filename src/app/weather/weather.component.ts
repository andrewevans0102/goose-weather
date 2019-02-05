import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from '../models/weather-data/weather-data';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  // TODO
  // Update README
  // Setup basic truthy tests
  // remove unused CSS objects
  // Create API key for OpenWeatherMapAPI
  // Modify keys for project to be stored in CircleCI
  // Create CircleCI deployment
  // Add material progress spinner when loading

  lat: string;
  long: string;
  weatherData: WeatherData = new WeatherData();
  cardsDisplay = [
    {
      title: 'Current Conditions',
      cols: 1,
      rows: 1
    },
    {
      title: 'About',
      cols: 1,
      rows: 1
    },
    {
      title: 'Weather Discussion',
      cols: 1,
      rows: 2
    },
    {
      title: 'Hourly Weather',
      cols: 2,
      rows: 1
    },
    {
      title: 'Weather Week',
      cols: 3,
      rows: 1
    }
  ];

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        for (const card of this.cardsDisplay) {
          if (card.title === 'Current Conditions') {
            card.cols = 3;
            card.rows = 1;
          } else if (card.title === 'About') {
            card.cols = 3;
            card.rows = 2;
          } else if (card.title === 'Weather Discussion') {
            card.cols = 3;
            card.rows = 2;
          } else if (card.title === 'Hourly Weather') {
            card.cols = 3;
            card.rows = 1;
          } else if (card.title === 'Weather Week') {
            card.cols = 3;
            card.rows = 1;
          }
        }
      } else {
        this.cardsDisplay = [
          {
            title: 'Current Conditions',
            cols: 1,
            rows: 1
          },
          {
            title: 'About',
            cols: 1,
            rows: 1
          },
          {
            title: 'Weather Discussion',
            cols: 1,
            rows: 2
          },
          {
            title: 'Hourly Weather',
            cols: 2,
            rows: 1
          },
          {
            title: 'Weather Week',
            cols: 3,
            rows: 1
          }
        ];
      }

      return this.cardsDisplay;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, public weatherService: WeatherService) {}

  ngOnInit(): void {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        this.savePosition(position);
      });
    } catch (error) {
      alert('Browser does not support location services');
    }
  }

  savePosition(position) {
    this.lat = position.coords.latitude.toFixed(4).toString();
    this.long = position.coords.longitude.toFixed(4).toString();

    // this.weatherService.getWeather(this.lat, this.long)
    // .then(
    //   function(success) {
    //     this.weatherDisplay = success;
    //     if (this.weatherDisplay.errorMessage !== undefined) {
    //       alert(this.weatherDisplay.errorMessage);
    //     }
    //   }.bind(this),
    //   function(error) {
    //     alert(error);
    //     this.weatherDisplay = new WeatherDisplay();
    //   }.bind(this)
    // );

    this.weatherService.getWeather(this.lat, this.long)
      .then((resolve) => {
        this.weatherData = resolve;
        if (this.weatherData.errorMessage !== '') {
          alert(this.weatherData.errorMessage);
        }
      })
      .catch((error) => { alert(error); });

  }
}
