<template>
  <v-card class="" max-width="344" outlined>
    <v-list-item three-line>
      <v-img
        max-height="120"
        max-width="150"
        :src="require(`/img/icons/${weatherData.WeatherIcon || '1'}.svg`)"
      ></v-img>
      <v-list-item-content>
        <div class="text-overline mb-4">
          {{ cityData.LocalizedName || "no city has chosen" }}
        </div>
        <v-list-item-title
          class="text-h5 mb-1"
          v-if="Object.keys(weatherData).length > 0"
        >
          {{
            `${
              weatherData.Temperature[unit === "C" ? "Metric" : "Imperial"]
                .Value
            }&deg;${unit}` || "choose some city"
          }}
        </v-list-item-title>
        <v-list-item-subtitle>{{
          weatherData.WeatherText
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CurrentWeather",
  computed: mapState("store", ["cityData", "weatherData", "unit"]),
};
</script>
