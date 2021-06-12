<template>
  <b-container>
    <b-row>
      <b-col></b-col>
      <b-col md="6">
        <b-form-group>
          <label>Категория бизнеса</label>
          <v-select
            v-model="category"
            id="category"
            :options="categories"
            placeholder="Выберите категорию"
            label="name"
            value="code"
            class="mb-2"
            :selectable="(option) => option.selectable"
          ></v-select>
        </b-form-group>
        <b-form-group>
          <label>Количество посетителей</label>
          <b-form-input type="number"></b-form-input>
        </b-form-group>
        <b-form-group>
          <label>Количество сотрудников</label>
          <b-form-input disabled type="number"></b-form-input>
        </b-form-group>
        <b-form-group>
          <label>Площадь помещения</label>
          <b-input-group append="кв. м.">
            <b-form-input></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group>
          <label>График работы</label>
          <b-form inline>
            <span class="mr-2">С</span>
            <the-mask class="form-control" :mask="['##:##']" />
            <span class="mx-2">по</span>
            <the-mask class="form-control" :mask="['##:##']" />
          </b-form>
        </b-form-group>
        <b-button @click="confirm" block variant="success"
          >Подтвердить</b-button
        >
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { TheMask } from "vue-the-mask";
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";

export default {
  data() {
    return {
      categories: [
        {
          name: "Фуд ритейл",
          code: "food",
        },
        {
          name: "Парикмахерские, салоны красоты и т.п.",
          code: "hairshop",
        },
        {
          name: "Рестораны, кафе, бары и ночные клубы",
          code: "bar",
          selectable: true,
        },
        {
          name: "Бытовая химия, магазины косметики и т.п.",
          code: "cosmetics",
        },
        {
          name: "Клиники, стоматологии, вет.клиники",
          code: "clinic",
        },
        {
          name: "Услуги и мелкая торговля.",
          code: "sales",
        },
      ],
      category: null,
    };
  },
  components: { TheMask, vSelect },
  methods: {
    confirm() {
      // do some backend actions
      this.$router.replace({ name: "map" });
    },
  },
};
</script>

<style>
</style>