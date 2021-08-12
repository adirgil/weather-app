<template>
  <div class="home pa-6">
    <h1>Home page</h1>
    <div class="d-flex justify-center">
      <AutocompleteInput @checkIfFavorite="checkIfFavorite" />
    </div>
    <div class="result pa-4 rounded-lg">
      <div class="top-area d-md-flex justify-md-space-between">
        <CurrentWeather />
        <ErrorModal />
        <div class="d-flex mt-3 mt-md-0">
          <v-btn class="mx-2" fab dark x-small color="pink">
            <v-icon dark>
              mdi-heart
            </v-icon>
          </v-btn>
          <v-btn
            depressed
            :color="isFavorite ? 'grey' : 'pink'"
            @click="updateFavorite(cityData.Key)"
            style="text-transform: none"
          >
            {{ isFavorite ? "Remove From Favorites" : "Add To Favorites" }}
          </v-btn>
        </div>
      </div>
      <Forecast5Days />
    </div>
  </div>
</template>

<script>
import AutocompleteInput from "../components/AutocompleteInput";
import CurrentWeather from "../components/CurrentWeather.vue";
import Forecast5Days from "../components/Forecast5Days.vue";
import ErrorModal from "../components/ErrorModal.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  data: () => ({
    isFavorite: false,
  }),
  components: { AutocompleteInput, CurrentWeather, Forecast5Days, ErrorModal },
  computed: mapState("store", ["cityData", "forecast5Days", "favorites"]),
  methods: {
    ...mapActions("store", [
      "updateFavorites",
      "updateWeatherBySearch",
      "updateWeatherByPosition",
    ]),
    updateFavorite(key) {
      this.isFavorite = !this.isFavorite;
      this.updateFavorites(key);
    },
    checkIfFavorite(val) {
      let exsist;
      if (val) {
        exsist = this.favorites.find(
          (favorite) => favorite.LocalizedName === val
        );
      } else {
        exsist = this.favorites.find(
          (favorite) => favorite.Key === this.cityData.Key
        );
      }
      exsist ? (this.isFavorite = true) : (this.isFavorite = false);
    },
  },
  created() {
    if (Object.keys(this.cityData).length === 0) {
      const defaultCity = {
        lat: 32.109333,
        lon: 34.855499,
      };
      this.updateWeatherByPosition(defaultCity);
      navigator.geolocation.getCurrentPosition(
        (res) => {
          const myPosition = {
            lat: res.coords.latitude,
            lon: res.coords.longitude,
          };
          this.updateWeatherByPosition(myPosition);
        },
        (error) => {
          console.log(
            "cannot find city from geolocation - tel aviv is showing by default , error: ",
            error
          );
        }
      );
    }
    this.checkIfFavorite();
  },
};
</script>

<style lang="sass" scoped>
.result
  border: 3px solid black
</style>
