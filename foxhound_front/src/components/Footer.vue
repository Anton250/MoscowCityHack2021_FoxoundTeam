<template>
  <b-container class="footer mt-5">
    <hr />
    <b-row>
      <b-col lg="2"></b-col>
      <b-col lg="3">
        <span>© {{ new Date().getFullYear() }} Foxhound</span>
      </b-col>
      <b-col lg="5">
        <b-nav vertical>
          <b-nav-item>Скачать приложение</b-nav-item>
          <b-nav-item to="/team">О команде</b-nav-item>
          <b-nav-item to="/algo">Об алгоритме</b-nav-item>
        </b-nav>
      </b-col>
      <b-col lg="2"></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {};
</script>

<style>
</style>