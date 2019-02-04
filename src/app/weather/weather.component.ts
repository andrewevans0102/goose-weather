import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Card } from 'src/models/card';
import { forEach } from '@angular/router/src/utils/collection';
import { WeatherDisplay } from '../models/weather-display';
import { WeatherService } from '../services/weather-service.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  // TODO
  // modify service to include data for different class objects
  // modify WeatherDisplay to consist of subclasses rather than one ginat class
  // Modify Weather Week to use bootstrap table instead of Material
  // Modify Current Conditions to pull in data from service

  lat: string;
  long: string;
  weatherDisplay: WeatherDisplay = new WeatherDisplay();
  cardsDisplay = [
    {
      title: 'Current Conditions',
      cols: 1,
      rows: 1
    },
    {
      title: 'Weather Week',
      cols: 1,
      rows: 1
    },
    {
      title: 'Hourly Weather',
      cols: 2,
      rows: 1
    },
    {
      title: 'Weather Discussion',
      cols: 1,
      rows: 1
    },
    {
      title: 'About',
      cols: 1,
      rows: 1
    }
  ];

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        for (const card of this.cardsDisplay) {
          card.cols = 2;
          card.rows = 1;
        }
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

    this.weatherService.getWeather(this.lat, this.long)
    .then(
      function(success) {
        this.weatherDisplay = success;
        if (this.weatherDisplay.errorMessage !== undefined) {
          alert(this.weatherDisplay.errorMessage);
        }
      }.bind(this),
      function(error) {
        alert(error);
        this.weatherDisplay = new WeatherDisplay();
      }.bind(this)
    );
  }
}
