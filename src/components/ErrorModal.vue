<template>
  <div class="text-center">
    <v-dialog v-model="this.displayError" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Error
        </v-card-title>

        <v-card-text>
          we could not retrieve some of the data...
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="setErrorModal(false)">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: mapState("store", ["displayError"]),
  methods: {
    ...mapMutations("store", ["setErrorModal"]),
  },
};
</script>
