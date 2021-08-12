<template>
  <v-container class="px-0" fluid>
    <v-switch
      color="secondary"
      @click="updateUnit()"
      v-model="switch1"
      :label="`Unit: ${unit}`"
    ></v-switch>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "ToggleSwitch",
  computed: mapState("store", ["unit"]),
  data: () => ({
    switch1: true,
  }),
  methods: {
    ...mapMutations("store", ["setUnit"]),
    updateUnit() {
      this.setUnit(this.unit === "C" ? "F" : "C");
    },
  },
};
</script>
