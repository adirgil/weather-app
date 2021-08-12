<template>
  <div class="favorites pa-6">
    <h1>{{ favorites.length ? "" : "You Currently dont have Favorites!" }}</h1>
    <div class="cards">
      <div v-for="favorite in favorites" :key="favorite.Key">
        <SingleFavorite :favorite="favorite" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SingleFavorite from "../components/SingleFavorite.vue";
export default {
  name: "Favorites",
  components: { SingleFavorite },
  computed: mapState("store", ["favorites"]),
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
  created() {},
};
</script>

<style lang="sass" scoped>
.cards
    display: grid
    grid-template-columns: repeat(4,1fr)
    gap: 20px
</style>
