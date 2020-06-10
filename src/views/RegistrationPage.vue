<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title v-if="is_registration">Зареєструйтесь</v-toolbar-title>
                <v-toolbar-title v-else>Увійдіть в систему</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Ім'я"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-if="is_registration"
                    v-model="name"
                    :rules="nameRules"
                  />
                  <v-text-field
                    label="Email"
                    name="login"
                    prepend-icon="person"
                    type="email"
                    v-model="email"
                    :rules="emailRules"
                  />
                  <v-text-field
                    id="password"
                    label="Пароль"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                    :rules="passwordRules"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="primary"
                  @click="loginUser"
                >{{!is_registration ? "Увійти" : "Зареєструватись"}}</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-col justify="center" align="center">
          <p v-if="is_registration">Увійдіть, якщо ви вже зареєстровані</p>
          <p v-else>Або зареєструйтесь, якщо ви ще цього не зробили</p>
          <v-btn
            @click="toggleRegistration"
            color="primary"
          >{{is_registration ? "Увійти" : "Зареєструватись"}}</v-btn>
        </v-col>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "RegistrationPage",
  data: () => ({
    is_registration: false,
    email: "",
    password: "",
    name: "",
    nameRules: [v => !!v || "Ім'я є обов'язковим"],
    emailRules: [v => !!v || "Логін є обов'язковим"],
    passwordRules: [v => !!v || "Пароль є обов'язковим"]
  }),
  methods: {
    toggleRegistration() {
      this.is_registration = !this.is_registration;
    },
    async loginUser() {
      if (this.is_registration) {
        await this.$store.dispatch("createNewUser", {
          email: this.email,
          password: this.password,
          name: this.name
        });
      } else {
        await this.$store.dispatch("loginUser", {
          email: this.email,
          password: this.password
        });
        await this.$store.dispatch("getUser");
        if (this.$store.state.access_token) {
          this.$router.push("/home");
        }
      }
    }
  },
  created() {
    let access_token = localStorage.getItem("access_token");
    if (access_token) {
      this.$store.commit("setToken", access_token);
      this.$router.replace("/home");
    }
  }
};
</script>