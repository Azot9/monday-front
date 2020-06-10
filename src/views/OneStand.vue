<template>
  <div class="laboratories_page">
    <div class="my-12 px-8">
      <DetailsTable :details="getStandDetails($route.params.id)" />
    </div>

    <v-container class="my-10 px-0">
      <p v-if="getStand($route.params.id)">Обране посилання: {{getStand($route.params.id).link}}</p>
      <v-text-field max-width="300px" v-model="api_link" label="API посилання"></v-text-field>
      <v-btn color="blue darken-1" text @click="saveLink">Зберегти</v-btn>
    </v-container>
    <StandChart />
  </div>
</template>


<script>
import StandChart from "../components/StandChart";
import DetailsTable from "../components/DetailsTable";
import { mapGetters } from "vuex";
import axios from 'axios'

export default {
  components: {
    StandChart,
    DetailsTable
  },
  name: "DetailsPage",
  data: () => ({
    api_link: ""
  }),
  methods: {
    async saveLink() {
      await this.$store.dispatch("saveLink", {
        link: this.api_link,
        id: this.$route.params.id
      });
      console.log(2312312);
      await axios
        .get(this.getStandDetails(this.$route.params.id).link)
        .then(response => {
          console.log(response.data);
        });
    }
  },
  computed: {
    ...mapGetters(["getStandDetails", "getStand"])
  }
};
</script>

<style>
</style>