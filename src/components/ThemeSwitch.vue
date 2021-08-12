<template>
  <v-container class="px-0" fluid>
    <v-switch
      color="secondary"
      v-model="$vuetify.theme.dark"
      label="Change Theme"
    ></v-switch>
  </v-container>
</template>

<script>
export default {
  name: "ThemeSwitch",
  data: () => ({
    switch1: true,
  }),
  methods: {},
};
</script>
