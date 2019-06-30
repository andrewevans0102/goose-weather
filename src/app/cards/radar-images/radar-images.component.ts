import { Component, OnInit } from '@angular/core';
import * as radar from '../../../assets/radar.json';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-radar-images',
  templateUrl: './radar-images.component.html',
  styleUrls: ['./radar-images.component.css']
})
export class RadarImagesComponent implements OnInit {

  radarImages = [];
  mobileView: boolean;

  constructor(private breakpointObserver: BreakpointObserver) { }

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

    this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          this.mobileView = true;
        } else {
          this.mobileView = false;
        }
      })
    );
  }

}
