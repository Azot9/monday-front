<template>
  <div class="details_page">
    <!-- <v-app id="inspire"> -->
    <div class="my-12 px-8">
      <DetailsTable :details="details" />
    </div>
    <!-- </v-app> -->
  </div>
</template>

<script>
import DetailsTable from "../components/DetailsTable";
import { mapState } from "vuex";

export default {
  name: "DetailsPage",
  components: {
    DetailsTable
  },
  computed: {
    ...mapState(["details"])
  }
};
</script>

<style>
</style>