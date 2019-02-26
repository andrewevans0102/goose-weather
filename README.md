# Goose Weather
![goose image](/src/assets/goose.svg)
- Project built with Angular 7
- Project uses NOAA APIs [here](https://www.weather.gov/documentation/services-web-api)
- Project is hosted on Firebase [here](https://firebase.google.com/)
- Project CICD pipeline is managed with CirlceCI [here](https://circleci.com/)
- Used Angular CDK Schematic to generate the tiles and the hourly forecast
- Angular Schematics can be seen [here](https://material.angular.io/guide/schematics)
- Also used dynamic component generation with the NgxComponentOutlet [here](https://github.com/IndigoSoft/ngxd)
- Currently the application is based on standard @Input decorators, but will be modified to use NgRx soon

## Open Weather Map API
- In order to get current conditions, this application uses the Open Weather Map API [here](https://openweathermap.org/api)
- In order to use Open Weather MAP API, you'll need to create a key [here](https://openweathermap.org/appid)
- You'll also need to export an environment variable with the key name to $OPEN_WEATHER_MAP_API_KEY
- Once you've created your key and saved the variable in your bash_profile or current session run the npm script `environment-variables` to populate the key value to the project's environment files
