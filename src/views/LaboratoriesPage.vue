<template>
  <v-container class="fill-height" fluid>
    <v-col cols="12" sm="6" md="4" v-for="laboratory in laboratories" :key="laboratory.id">
      <v-card height="200">
        <v-btn @click.stop="deleteLaboratory(laboratory.id)" fab top right small absolute>
          <v-icon small>close</v-icon>
        </v-btn>
        <router-link :to="`/laboratory/${laboratory.id}`">
          <v-container class="fill-height">
            <v-col justify="center" align="center">
              <v-icon large>mdi-google-cardboard</v-icon>
              <p class="text-center">{{laboratory.name}}</p>
            </v-col>
          </v-container>
        </router-link>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" md="4" fluid>
      <!-- <router-link :to="`/stands/${index}`"> -->
      <v-card height="200" @click="openCreator">
        <v-container class="fill-height">
          <v-col justify="center" align="center">
            <v-icon large>mdi-plus</v-icon>
            <p class="text-center">Нова Лабораторія</p>
          </v-col>
        </v-container>
      </v-card>
      <!-- </router-link> -->
    </v-col>
    <v-dialog max-width="600" v-model="is_new_lab_open" fluid>
      <v-card cols="12" sm="6" md="4">
        <v-container class="py-4 px-8" fluid>
          <v-text-field v-model="new_name" label="Ім'я стенда"></v-text-field>
          <v-row justify="end">
            <v-btn color="primary" @click="createLaboratory" text>Зберегти</v-btn>
            <v-btn color="error" @click="closeCreator" text>Скасувати</v-btn>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "HomePage",
  data: () => ({
    new_name: "",
    is_new_lab_open: false
  }),
  computed: {
    ...mapState(["laboratories"])
  },
  methods: {
    openCreator() {
      this.is_new_lab_open = true;
    },
    closeCreator() {
      this.is_new_lab_open = false;
    },
    createLaboratory() {
      this.closeCreator();
      this.$store.dispatch("createLaboratory", this.new_name);
    },
    deleteLaboratory(id) {
      console.log(id);
      this.$store.dispatch("deleteLaboratory", id);
    }
  }
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

