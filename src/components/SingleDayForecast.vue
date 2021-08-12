<template>
  <div class="singleDayForecast mb-4">
    <v-card elevation="2" outlined shaped>
      <v-card-title>
        {{ days[new Date(singleForecast.Date).getDay()] }}
      </v-card-title>
      <v-card-subtitle>
        {{
          `${singleForecast.Temperature.Minimum.Value}&deg;${singleForecast.Temperature.Minimum.Unit} - 
        ${singleForecast.Temperature.Maximum.Value}&deg;${singleForecast.Temperature.Maximum.Unit}`
        }}
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "SingleDayForecast",
  props: ["singleForecast"],
  data: () => ({
    days: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  }),
};
</script>

<style lang="sass" scoped>
.v-card
    display: grid
    justify-content: center
</style>
