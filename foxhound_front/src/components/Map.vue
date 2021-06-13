<template>
  <div>
    <b-overlay :show="$store.state.loading" rounded="sm">
      <b-container>
        <b-row>
          <b-col cols='3'>
            <b-form-checkbox
              v-model="redactorMode"
              size="lg"
              name="check-button"
              switch
              class="my-3"
            >
              <p v-if="redactorMode">Режим редактирования</p>
              <p v-else>Режим просмотра</p>
            </b-form-checkbox>
          </b-col>
          <b-col cols='3'>
            <b-form-checkbox
              v-model="showHeatMap"
              size="sm"
              name="check-button"
              switch
            >
              <p v-if="!showHeatMap">Показать тепловую карту</p>
              <p v-else>Скрыть тепловую карту</p>
            </b-form-checkbox>
            <b-form-checkbox
              v-model="showObjects"
              size="sm"
              name="check-button"
              switch
            >
              <p v-if="!showObjects">Показать объекты</p>
              <p v-else>Скрыть объекты</p>
            </b-form-checkbox>
          </b-col>
          <b-col>
            <transition name="fade">
              <b-alert show v-if="circleDraw && redactorMode" variant="info"
                >Выберите точку на карте, чтобы создать круг</b-alert
              >
            </transition>
            <transition name="fade">
              <b-alert show v-if="deleteMode && redactorMode" variant="info"
                >Выберите элемент, который хотите удалить</b-alert
              >
            </transition>
            <transition name="fade">
              <b-form inline v-if="lineDraw && redactorMode">
                <label class="m-1">Толщина линии</label>
                <b-form-spinbutton
                  class="m-1"
                  v-model="lineSize"
                  min="1"
                  max="15"
                ></b-form-spinbutton>
                <b-button
                  @click="saveLine"
                  variant="success"
                  class="m-1"
                  :disabled="$store.state.linePoints.length < 2"
                >
                  Сохранить
                </b-button>

                <b-button
                  @click="cancelLine"
                  class="m-1"
                  variant="danger"
                  :disabled="$store.state.linePoints.length < 1"
                >
                  Отменить
                </b-button>
                <b-button
                  @click="undoLine"
                  class="m-1"
                  variant="warning"
                  :disabled="$store.state.linePoints.length < 1"
                  v-b-popover.hover.bottom="'Undo Ctrl+Z'"
                >
                  <b-icon-arrow-counterclockwise />
                </b-button>
              </b-form>
            </transition>
          </b-col>
        </b-row>
        <b-row>
          <transition
            v-on:before-enter="beforeEnter"
            v-on:before-leave="beforeLeave"
            v-on:enter="enter"
            v-on:leave="leave"
            v-bind:css="false"
          >
            <b-col md="1" v-if="redactorMode">
              <b-form-checkbox
                v-model="circleDraw"
                name="check-button"
                class="m-1"
                button
                button-variant="outline-primary"
                :disabled="lineDraw || deleteMode"
                v-b-popover.hover.right="'Отметить круг'"
              >
                <b-icon-circle />
              </b-form-checkbox>
              <b-form-checkbox
                v-model="lineDraw"
                name="check-button"
                class="m-1"
                button
                button-variant="outline-primary"
                :disabled="circleDraw || deleteMode"
                v-b-popover.hover.right="'Нарисовать линию по точкам'"
              >
                <b-icon-pencil />
              </b-form-checkbox>
              <b-form-checkbox
                v-model="deleteMode"
                name="check-button"
                class="m-1"
                button
                button-variant="outline-danger"
                :disabled="circleDraw || lineDraw"
                v-b-popover.hover.right="'Удалить элементы'"
              >
                <b-icon-trash />
              </b-form-checkbox>
            </b-col>
          </transition>
          <b-col><HereMap :center="center" /></b-col>
        </b-row>
      </b-container>
      <ModalEditPoint @addCircle="addCircle" />
    </b-overlay>
  </div>
</template>

<script>
import HereMap from "./HereMap";
import ModalEditPoint from "./ModalEditPoint";
import Velocity from "velocity-animate";

export default {
  name: "app",
  components: {
    HereMap,
    ModalEditPoint,
  },
  data() {
    return {
      center: {
        lat: 55.73336668770146,
        lng: 37.62506377774014,
      },
      loading: true,
    };
  },
  watch: {
    $route() {
      this.routeWatcher();
    },
  },
  async beforeMount() {
    if (this.$route.query.lat && this.$route.query.lng) {
      this.center.lat = this.$route.query.lat;
      this.center.lng = this.$route.query.lng;
    }
    // get data
    await this.$store.dispatch('getItems');
    await this.$store.dispatch('getHeatMap');
    this.$store.commit("setLoading", false);
  },
  mounted() {
    this.routeWatcher();
    document.addEventListener("keyup", this.keyupHandler);
  },
  methods: {
    saveLine() {
      let points = [...this.$store.state.linePoints];
      let style = { ...this.$store.state.lineStyle };
      this.$store.commit("setLineObj", null);
      this.$store.commit("setLinePoints", []);
      this.$store.commit("addItem", {
        type: "line",
        points: points,
        style: style,
      });
    },
    cancelLine() {
      this.$store.commit("setLinePoints", []);
    },
    addCircle(circle) {
      this.$store.commit("addItem", circle);
    },
    undoLine() {
      this.$store.commit("undoLinePoint");
    },
    routeWatcher() {
      if (this.$route.query.modalType) {
        this.$bvModal.show(this.$route.query.modalType);
      }
      this.$store.commit(
        "setRedactorMode",
        this.$route.query.redactorMode == "1" ? true : false
      );
      this.$store.commit(
        "setCircleDraw",
        this.$route.query.mode == "1" ? true : false
      );
      this.$store.commit(
        "setLineDraw",
        this.$route.query.mode == "2" ? true : false
      );
      this.$store.commit(
        "setDeleteMode",
        this.$route.query.mode == "3" ? true : false
      );
      this.$store.commit(
        "setShowHeatMap",
        this.$route.query.showHeatMap == "1" ? true : false
      );
      this.$store.commit(
        "setShowObjects",
        this.$route.query.showObjects == "1" ? true : false
      );
    },
    keyupHandler(event) {
      if (event.ctrlKey && event.code === "KeyZ") {
        this.$store.commit("undoLinePoint");
      }
    },
    beforeEnter: function (el) {
      if (window.innerWidth >= 576) el.style.maxWidth = 0;
      else el.style.maxHeight = 0;
      el.style.opacity = 0;
      el.style.transformOrigin = "left";
    },
    enter: function (el, done) {
      let animation = { opacity: 1 };
      if (window.innerWidth >= 576) animation.maxWidth = "100%";
      else animation.maxHeight = "100%";
      Velocity(el, animation, { duration: "slow", complete: done });
    },
    beforeLeave: function (el) {
      if (window.innerWidth >= 576) el.style.maxWidth = "100%";
      else el.style.maxHeight = "100%";
      el.style.opacity = 1;
      el.style.transformOrigin = "right";
    },
    leave: function (el, done) {
      let animation = { opacity: 0 };
      if (window.innerWidth >= 576) animation.maxWidth = 0;
      else animation.maxHeight = 0;
      Velocity(
        el,
        animation,
        { duration: "normal", complete: done }
      );
    },
  },
  computed: {
    redactorMode: {
      get() {
        return this.$store.state.redactorMode;
      },
      set(value) {
        this.$router.replace({
          name: this.$route.name,
          query: { ...this.$route.query, redactorMode: value ? 1 : 0 },
        });
      },
    },
    circleDraw: {
      get() {
        return this.$store.state.circleDraw;
      },
      set(value) {
        this.$router.replace({
          name: this.$route.name,
          query: { ...this.$route.query, mode: value ? 1 : 0 },
        });
      },
    },
    lineDraw: {
      get() {
        return this.$store.state.lineDraw;
      },
      set(value) {
        this.$router.replace({
          name: this.$route.name,
          query: { ...this.$route.query, mode: value ? 2 : 0 },
        });
      },
    },
    lineSize: {
      get() {
        return this.$store.state.lineStyle.lineWidth;
      },
      set(value) {
        let style = { ...this.$store.state.lineStyle };
        style.lineWidth = value;
        this.$store.commit("setLineStyle", style);
      },
    },
    deleteMode: {
      get() {
        return this.$store.state.deleteMode;
      },
      set(value) {
        this.$router.replace({
          name: this.$route.name,
          query: { ...this.$route.query, mode: value ? 3 : 0 },
        });
      },
    },
    showHeatMap: {
      get() {
        return this.$store.state.showHeatMap;
      },
      set(value) {
        this.$router.replace({
          name: this.$route.name,
          query: { ...this.$route.query, showHeatMap: value ? 1 : 0 },
        });
      },
    },
    showObjects: {
      get() {
        return this.$store.state.showObjects;
      },
      set(value) {
        this.$router.replace({
          name: this.$route.name,
          query: { ...this.$route.query, showObjects: value ? 1 : 0 },
        });
      },
    },
  },
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>