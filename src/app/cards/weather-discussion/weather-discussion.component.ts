import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-discussion',
  templateUrl: './weather-discussion.component.html',
  styleUrls: ['./weather-discussion.component.css']
})
export class WeatherDiscussionComponent implements OnInit {

  discussions = [
    {
      title: 'Today',
      description: 'A slight chance of rain showers after 3pm. Mostly cloudy,' +
        'with a high near 39. Southwest wind around 3 mph. Chance of precipitation is 20%.'
    },
    {
      title: 'Today',
      description: 'A slight chance of rain showers after 3pm. Mostly cloudy,' +
        'with a high near 39. Southwest wind around 3 mph. Chance of precipitation is 20%.'
    },
    {
      title: 'Today',
      description: 'A slight chance of rain showers after 3pm. Mostly cloudy,' +
        'with a high near 39. Southwest wind around 3 mph. Chance of precipitation is 20%.'
    },
    {
      title: 'Today',
      description: 'A slight chance of rain showers after 3pm. Mostly cloudy,' +
        'with a high near 39. Southwest wind around 3 mph. Chance of precipitation is 20%.'
    },
    {
      title: 'Today',
      description: 'A slight chance of rain showers after 3pm. Mostly cloudy,' +
        'with a high near 39. Southwest wind around 3 mph. Chance of precipitation is 20%.'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
