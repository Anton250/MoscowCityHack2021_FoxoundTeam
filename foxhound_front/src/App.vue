<template>
  <div id="app">
    <Nav />
    <transition name='fade' mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Nav from "./components/Nav";
import ErrorModal from "./plugins/ErrorModal";

export default {
  name: "app",
  components: {
    Nav,
  },
  beforeMount() {
    ErrorModal.ErrorEvent.$on("show", (params) => {
      this.$bvModal.msgBoxOk(params.data, params.opts);
    });
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
