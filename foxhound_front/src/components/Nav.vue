 <template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-brand to="/"
          ><b-img :src="teamLogo" /> Foxhound</b-navbar-brand
        >
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="$store.state.isAuthenticated" to="/">На главную</b-nav-item>
            <!-- <b-nav-item to="/team">О команде</b-nav-item>
            <b-nav-item to="/algo">Об алгоритме</b-nav-item> -->
            <b-link
              to="/login"
              class="btn btn-outline-primary ml-5"
              v-if="!$store.state.isAuthenticated"
              >Авторизоваться</b-link
            >
            <b-nav-item-dropdown text="Пользователь" right v-else>
              <template #button-content
                ><span class="mr-1">{{ $store.state.user.username }}</span
                ><b-avatar
                  variant="primary"
                  size="sm"
                  :text="$store.state.user.username[0]"
              /></template>
              <b-dropdown-item
                variant="danger"
                @click="logout"
                >Выйти</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      teamLogo: require("../assets/foxhound.png"),
    };
  },
  methods: {
    async logout(){
      await this.$store.dispatch('logout');
      if (!this.$store.state.isAuthenticated) {
        this.$router.replace({name: 'login'})
      }
    }
  }
};
</script>