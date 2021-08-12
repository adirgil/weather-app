<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Powerd By:
          </v-list-item-title>
          <v-list-item-subtitle>
            AccuWeather
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dense dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Adir`s Weather App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-list-item-content class="switch">
        <ToggleSwitch />
      </v-list-item-content>
      <v-list-item-content class="switch">
        <ThemeSwitch />
      </v-list-item-content>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import ToggleSwitch from "./components/ToggleSwitch.vue";
import ThemeSwitch from "./components/ThemeSwitch.vue";
export default {
  components: { ToggleSwitch, ThemeSwitch },
  data: () => ({
    items: [
      { title: "Home", icon: "mdi-home", to: "/" },
      { title: "Favorites", icon: "mdi-heart", to: "/Favorites" },
    ],
    right: null,
    drawer: null,
  }),
};
</script>

<style lang="sass" scoped>
.switch
  margin-left: 5vh
  margin-top: 2%
  flex: none
  padding: 4vh
</style>
