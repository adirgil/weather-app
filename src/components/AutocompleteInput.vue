<template>
  <v-toolbar class="mb-3" color="primary accent-1" max-width="500px">
    <v-toolbar-title class="text-h6 mr-6 hidden-sm-and-down">
      Location
    </v-toolbar-title>
    <v-autocomplete
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      chips
      clearable
      hide-details
      hide-selected
      item-text="LocalizedName"
      item-value="symbol"
      label="Search for a location.."
      solo
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            Search for a location to find
            <strong>forecast</strong>
          </v-list-item-title>
        </v-list-item>
      </template>
      <template v-slot:selection="{ attr, on, item, selected }">
        <v-chip
          v-bind="attr"
          :input-value="selected"
          color="blue-grey"
          class="white--text"
          v-on="on"
        >
          <span v-text="item.LocalizedName"></span>
        </v-chip>
      </template>
      <template v-slot:item="{ item }">
        <v-list-item-avatar
          color="indigo"
          class="text-h5 font-weight-light white--text"
        >
          {{ item.LocalizedName.charAt(0) }}
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.LocalizedName"></v-list-item-title>
          <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-map-marker</v-icon>
        </v-list-item-action>
      </template>
    </v-autocomplete>
  </v-toolbar>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AutocompleteInput",
  props: ["checkIfFavorite"],
  data: () => ({
    isLoading: false,
    items: [],
    model: null,
    search: null,
    tab: null,
  }),
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 220;
        case "xl":
          return 800;
      }
    },
  },
  methods: {
    ...mapActions("store", ["updateFavorites", "updateWeatherBySearch"]),
    debounce(func) {
      clearTimeout(this._timerId);
      this._timerId = setTimeout(() => {
        func();
      }, 2000);
    },
  },
  watch: {
    model(val) {
      if (!val) {
        this.items = [];
        return;
      }
      this.$emit("checkIfFavorite", val);
      this.updateWeatherBySearch(val);
    },
    search(val) {
      if (!val) {
        this.items = [];
      }
      this.debounce(() => {
        if (val) {
          this.isLoading = true;
          fetch(
            `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=LX0BO8EfLdF7rqnTeQkXzCTh3vAi8UOA&q=${val}`
          )
            .then((res) => res.clone().json())
            .then((res) => {
              this.items = res;
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => (this.isLoading = false));
        }
      });
    },
  },
};
</script>
