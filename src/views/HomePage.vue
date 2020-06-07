<template>
  <v-container class="fill-height" fluid>
    <v-col cols="12" sm="6" md="4">
      <router-link to="/stands">
        <v-card height="200">
          <v-container class="fill-height">
            <v-col justify="center" align="center">
              <v-icon large>mdi-google-cardboard</v-icon>
              <p class="text-center">Стенди</p>
            </v-col>
          </v-container>
        </v-card>
      </router-link>
    </v-col>
    <v-col cols="12" sm="6" md="4">
      <router-link to="/details">
        <v-card height="200">
          <v-container class="fill-height">
            <v-col justify="center" align="center">
              <v-icon large>mdi-android</v-icon>
              <p class="text-center">Запчастини</p>
            </v-col>
          </v-container>
        </v-card>
      </router-link>
    </v-col>
    <v-col cols="12" sm="6" md="4">
      <router-link to="/laboratories">
        <v-card height="200">
          <v-container class="fill-height">
            <v-col justify="center" align="center">
              <v-icon large>mdi-domain</v-icon>
              <p class="text-center">Лабораторії</p>
            </v-col>
          </v-container>
        </v-card>
      </router-link>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "HomePage"
};
</script>

<style lang="scss" scoped>
.v-card {
  cursor: pointer;
}
a {
  text-decoration: none;
}
p {
  font-size: 20px;
}
</style>

