# Goose Weather
![goose image](/src/assets/goose.svg)

- Weather application that I named for my wife, and her dream of being a meteorologist
- Application is built with Angular and uses [NOAA APIs](https://www.weather.gov/documentation/services-web-api) and the [OpenWeatherMapAPI Service](https://openweathermap.org/api) to create a weather forecast
- Application uses the following platforms and frameworks:
    - [NgRx](https://ngrx.io/) 
    - [Angular Material](https://material.angular.io/)
    - [Bootstrap](https://getbootstrap.com/)
    - [Firebase](https://firebase.google.com/)
    - [CircleCI](https://circleci.com/)
- Visit the hosted site at https://www.gooseweather.com

## Open Weather Map API
- In order to get current conditions, this application uses the Open Weather Map API [here](https://openweathermap.org/api)
- In order to use Open Weather MAP API, you'll need to create a key [here](https://openweathermap.org/appid)
- You'll also need to export an environment variable with the key name to `$OPEN_WEATHER_MAP_API_KEY`
- Once you've created your key and saved the variable in your bash_profile or current session run the npm script `environment-variables` to populate the key value to the project's environment files
