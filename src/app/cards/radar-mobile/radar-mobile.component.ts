import { Component, OnInit } from '@angular/core';
import * as radar from '../../../assets/radar.json';

@Component({
  selector: 'app-radar-mobile',
  templateUrl: './radar-mobile.component.html',
  styleUrls: ['./radar-mobile.component.css']
})
export class RadarMobileComponent implements OnInit {

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
