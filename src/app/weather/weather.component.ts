import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Card } from 'src/models/card';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {

  // cards defined
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

  constructor(private breakpointObserver: BreakpointObserver) {}
}
