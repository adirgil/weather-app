<template>
  <div class="forecast5Days">
    <h1
      class="d-flex justify-center mb-4"
      v-if="Object.keys(forecast5Days).length > 0"
    >
      {{ forecast5Days.Headline.Text }}
    </h1>
    <div class="d-flex flex-wrap justify-space-between">
      <div
        v-for="singleForecast in forecast5Days.DailyForecasts"
        :key="singleForecast.Date"
      >
        <SingleDayForecast :singleForecast="singleForecast" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SingleDayForecast from "./SingleDayForecast.vue";
export default {
  name: "Forecast5Days",
  components: { SingleDayForecast },
  computed: mapState("store", ["forecast5Days"]),
};
</script>

<style lang="sass" scoped>
.forecast5Days
    display: grid
.cards
    display: grid
    grid-template-columns: repeat(5,1fr)
    gap: 20px
</style>
