<template>
  <b-modal
    @ok="saveData"
    @hidden="closeModal()"
    id="editPointModal"
    :title="`Редактировать точку: ${lat}, ${lng}`"
    centered
    cancel-title="Отменить"
    ok-title="Добавить"
  >
    <label>Радиус в метрах</label>
    <b-input class="my-2" v-model.number="size"></b-input>
    <b-input v-model="circleData" placeholder="Данные"></b-input>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      size: 0,
      circleData: "",
    };
  },
  computed: {
    lat() {
      return this.$route.query.lat;
    },
    lng() {
      return this.$route.query.lng;
    },
  },
  methods: {
    closeModal() {
      this.size = 0;
      this.circleData = "";
      var q = { ...this.$route.query };
      this.$delete(q, "lat");
      this.$delete(q, "lng");
      this.$delete(q, "modalType");
      this.$router.replace({
        name: this.$route.name,
        query: q,
      });
    },
    saveData() {
      let circle = {
        type: "circle",
        lat: this.lat,
        lng: this.lng,
        size: this.size,
        style: {
          strokeColor: "rgba(55, 85, 170, 0.6)", // Color of the perimeter
          lineWidth: 2,
          fillColor: "rgba(222, 89, 80, 0.7)", // Color of the circle
        },
        data: `<p>${this.circleData}</p>`,
      };
      this.$emit("addCircle", circle);
      // save data here
      this.closeModal();
    },
  },
};
</script>

<style>
</style>