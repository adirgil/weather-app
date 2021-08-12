import forecast from "../forecast";

const state = {
  displayError: false,
  unit: "C",
  favorites: [],
  forecast5Days: {},
  cityData: {},
  weatherData: {},
};

const mutations = {
  setFavorites: (state, newFavoritesArr) => (state.favorites = newFavoritesArr),
  setCityData: (state, cityObj) => (state.cityData = cityObj),
  setWeatherData: (state, weatherDataObj) =>
    (state.weatherData = weatherDataObj),
  set5DaysForecast: (state, forecast5DaysObj) =>
    (state.forecast5Days = forecast5DaysObj),
  setUnit: (state, unitChange) => (state.unit = unitChange),
  setErrorModal: (state, shouldDisplay) => (state.displayError = shouldDisplay),
};

const getters = {};

const actions = {
  updateFavorites: async ({ state, commit }, key) => {
    let newFavoritesArr = [...state.favorites];
    const exsist = state.favorites.find((favorite) => favorite.Key === key);
    if (exsist) {
      newFavoritesArr = newFavoritesArr.filter(
        (favorite) => favorite.Key !== key
      );
      commit("setFavorites", newFavoritesArr);
    } else {
      const newFavorite = {
        Key: state.cityData.Key,
        LocalizedName: state.cityData.LocalizedName,
        Temperature: state.weatherData.Temperature,
        WeatherText: state.weatherData.WeatherText,
      };
      newFavoritesArr.push(newFavorite);
      commit("setFavorites", newFavoritesArr);
    }
  },

  updateWeatherByKey: async ({ state, commit }, key) => {
    try {
      const weatherData = await forecast.getWeather(key);
      commit("setWeatherData", weatherData);
      const forecast5Days = await forecast.get5DaysForecast(key);
      commit("set5DaysForecast", forecast5Days);
    } catch (err) {
      commit("setErrorModal", true);
    }
  },

  updateWeatherBySearch: async ({ state, commit }, val = "Tel Aviv") => {
    try {
      const cityData = await forecast.getCity(val);
      commit("setCityData", cityData);
      const weatherData = await forecast.getWeather(cityData.Key);
      commit("setWeatherData", weatherData);
      const forecast5Days = await forecast.get5DaysForecast(cityData.Key);
      commit("set5DaysForecast", forecast5Days);
    } catch (err) {
      commit("setErrorModal", true);
    }
  },

  updateWeatherByPosition: async ({ state, commit }, positionObj) => {
    try {
      const cityData = await forecast.getCityByPosition(positionObj);
      commit("setCityData", cityData);
      const weatherData = await forecast.getWeather(cityData.Key);
      commit("setWeatherData", weatherData);
      const forecast5Days = await forecast.get5DaysForecast(cityData.Key);
      commit("set5DaysForecast", forecast5Days);
    } catch (err) {
      commit("setErrorModal", true);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
