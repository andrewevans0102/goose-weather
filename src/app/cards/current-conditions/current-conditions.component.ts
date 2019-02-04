import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'Latitude: 1234', cols: 2, rows: 1, color: 'lightblue'},
    {text: 'Longitude: 1234', cols: 2, rows: 1, color: 'lightblue'},
    {text: 'City: Richmond', cols: 2, rows: 1, color: 'lightblue'},
    {text: 'State: Virginia', cols: 2, rows: 1, color: 'lightblue'},
    {text: 'Temp: 22 ', cols: 2, rows: 1, color: 'lightblue'},
    {text: 'image', cols: 2, rows: 2, color: 'lightblue'},
    {text: 'High: 50 ', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Low: 20 ', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Humidity: 40% ', cols: 2, rows: 1, color: 'lightblue'},
    {text: 'Wind: 5 MPH NW', cols: 2, rows: 1, color: 'lightblue'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
