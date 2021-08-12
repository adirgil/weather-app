const accuWeatherKey = "LX0BO8EfLdF7rqnTeQkXzCTh3vAi8UOA";

export default {
  getCity: async (city) => {
    const baseUrl =
      "https://dataservice.accuweather.com/locations/v1/cities/autocomplete";
    const query = `?apikey=${accuWeatherKey}&q=${city}`;
    const response = await fetch(baseUrl + query);
    const data = await response.json();
    return data[0];
  },
  getCityByPosition: async (positionObj) => {
    const baseUrl =
      "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search";
    const query = `?q=${positionObj.lat},${positionObj.lon}&apikey=${accuWeatherKey}`;
    const response = await fetch(baseUrl + query);
    const data = await response.json();
    return data;
  },
  getWeather: async (id) => {
    const baseUrl = "https://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${id}?apikey=${accuWeatherKey}`;
    const response = await fetch(baseUrl + query);
    const data = await response.json();
    return data[0];
  },
  get5DaysForecast: async (id) => {
    const baseUrl =
      "https://dataservice.accuweather.com/forecasts/v1/daily/5day/";
    const query = `${id}?apikey=${accuWeatherKey}`;
    const response = await fetch(baseUrl + query);
    const data = await response.json();
    return data;
  },
};
