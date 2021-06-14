<template>
  <b-container>
    <b-row class="mt-5">
      <b-col cols="12"><h1>Foxhound</h1></b-col>
    </b-row>
    <b-row>
      <b-col class="my-1" sm="7" order-sm="1" order="12"
        ><b-img class="w-75" :src="hackLogo"></b-img>
        <h3 class="mt-2">
          Сервис рекомендаций по размещению и локальному продвижению бизнеса
        </h3></b-col
      >
      <b-col class="my-1" order-sm="12" order="1" sm="5">
        <b-card>
          <b-form-group>
            <label><b>Логин</b></label>
            <b-input v-model="username"></b-input>
          </b-form-group>
          <b-form-group>
            <label><b>Пароль</b></label>
            <b-input type="password" v-model="password"></b-input>
          </b-form-group>
          <b-form-group>
            <b-form-checkbox>Запомнить меня</b-form-checkbox>
          </b-form-group>
          <b-button @click='login' variant="primary" block>Войти</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      hackLogo: require("../assets/moscowCityHack.svg"),
    };
  },
  methods: {
    async login() {
      await this.$store.dispatch("login", {
        username: this.username,
        password: this.password,
      });
      if (this.$store.state.isAuthenticated){
        this.$router.replace({ name: "Home" });
      }
    },
  },
  beforeMount() {
    if (this.$store.state.isAuthenticated) {
      this.$router.replace({ name: "Home" });
    }
  },
};
</script>

<style scoped>
.container {
  max-width: 960px;
}
</style>