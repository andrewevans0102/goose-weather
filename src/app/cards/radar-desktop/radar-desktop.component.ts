import { Component, OnInit } from '@angular/core';
import * as radar from '../../../assets/radar.json';

@Component({
  selector: 'app-radar-desktop',
  templateUrl: './radar-desktop.component.html',
  styleUrls: ['./radar-desktop.component.css']
})
export class RadarDesktopComponent implements OnInit {

  radarImages = [];

  constructor() { }

  ngOnInit() {
    const radarJSON = JSON.stringify(radar);
    const radarParsed = JSON.parse(radarJSON);
    radarParsed.default.forEach((parsedRadar) => {
      const radarImage = {
        location: parsedRadar.location,
        image: parsedRadar.image,
        link: parsedRadar.link
      };
      this.radarImages.push(radarImage);
    });
  }

}
