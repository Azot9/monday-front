<template>
  <div>
    <v-app>
      <MainNavigator v-if="$route.path !== '/'" />
      <router-view />
    </v-app>
  </div>
</template>

<script>
import MainNavigator from "./components/MainNavigator";
import { mapState } from "vuex";
import http from "./plugins/http";

export default {
  components: {
    MainNavigator
  },
  computed: {
    ...mapState(["access_token"])
  },
  created() {
    if (
      !localStorage.hasOwnProperty("access_token") &&
      this.$route.path !== "/"
    ) {
      this.$router.replace("/");
    } else {
      http.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");
      this.$store.dispatch("getUser");
    }
  }
};
</script>