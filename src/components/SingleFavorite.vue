<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        class="singleFavorite mx-auto rounded-lg"
        max-width="250"
        :elevation="hover ? 24 : 6"
      >
        <v-card-text>
          <p class="text-h4 text--primary">
            {{ favorite.LocalizedName }}
          </p>
          <p class="text-h5 text--primary">
            {{
              `${
                favorite.Temperature[unit === "C" ? "Metric" : "Imperial"].Value
              }&deg;${unit}`
            }}
          </p>
          <p class="text-h6 text--primary">
            {{ favorite.WeatherText }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                @click="UpdateCurrentWeather()"
              >
                Go To <v-icon>mdi-arrow-right-thick</v-icon>
              </v-btn>
            </template>
            <span>{{
              `Go to Home page with ${favorite.LocalizedName} Location`
            }}</span>
          </v-tooltip>
        </v-card-actions>
      </v-card>
    </template>
  </v-hover>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "SingleFavorite",
  props: ["favorite"],
  computed: mapState("store", ["unit"]),
  methods: {
    ...mapActions("store", ["updateWeatherByKey"]),
    ...mapMutations("store", ["setCityData"]),
    UpdateCurrentWeather() {
      this.setCityData({
        Key: this.favorite.Key,
        LocalizedName: this.favorite.LocalizedName,
      });
      this.updateWeatherByKey(this.favorite.Key);
      this.$router.push({ path: "/" });
    },
  },
  data: () => ({}),
};
</script>

<style lang="sass" scoped>
.v-btn
    text-transform: none
.v-card
    display: grid
    justify-content: center
.v-card__text
    display: grid
    justify-items: center
.singleFavorite
    display: grid
    justify-items: center
</style>
