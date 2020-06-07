<template>
  <div>
    <v-toolbar color="#1976d2">
      <v-btn icon to="/home">
        <v-icon>home</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="openMenu"></v-app-bar-nav-icon>
    </v-toolbar>
    <v-navigation-drawer v-model="is_open" right absolute temporary>
      <v-list-item link to="/home">
        <v-list-item-title class="title">Головна</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        <v-list-item key="logout" class="mt-8" @click="logout">
          <v-list-item-icon>
            <v-icon>logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Вийти</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "MainNavigator",
  data() {
    return {
      is_open: false,
      items: [
        { title: "Стенди", icon: "mdi-google-cardboard", link: "/stands" },
        { title: "Запчастини", icon: "mdi-android", link: "/details" },
        { title: "Лабораторії", icon: "mdi-domain", link: "/laboratories" }
      ],
      right: null
    };
  },
  methods: {
    openMenu() {
      this.is_open = true;
    },
    logout() {
      this.$store.commit("setToken", "");
      localStorage.removeItem('access_token');
      this.$router.push('/');
    }
  }
};
</script>

<style>
</style>