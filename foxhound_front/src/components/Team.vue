<template>
  <b-container class="mt-2">
    <b-jumbotron
      lead="Команда Foxhound: 7 побед на хакатонах за прошедший год, компетенции в
      сфере разработки ПО, информационной безопасности, автоматического
      управления"
    >
      <template #header
        ><span class="line-1 anim-typewriter">{{ logo }}</span></template
      >
    </b-jumbotron>
    <transition-group
      appear
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      tag="div"
      class="card-deck"
    >
      <b-card
        class="text-center"
        v-for="(mate, i) in team"
        :index="i"
        :key="mate.fio"
      >
        <b-avatar
          :src="mate.avatar"
          size="11rem"
          badge-variant="none"
          badge-offset="-1rem"
          ><template #badge
            ><b-avatar
              square
              size="3rem"
              variant="none"
              :src="mate.univAvatar"
            ></b-avatar></template
        ></b-avatar>
        <h4>{{ mate.fio }}</h4>
        <p>{{ mate.university }}</p>
        <p>{{ mate.info }}</p>
      </b-card>
    </transition-group>
  </b-container>
</template>

<script>
import Velocity from "velocity-animate";
export default {
  data() {
    return {
      team: [
        {
          fio: "Антон Недогарок",
          university: "МГТУ им. Н.Э. Баумана",
          info: "Матмоделирование, разработка ПО",
          avatar: require("../assets/AntonN.jpg"),
          univAvatar: require("../assets/bauman.png"),
        },
        {
          fio: "Антон Петров",
          university: "Московский политех",
          info: "Full Stack разработка",
          avatar: require("../assets/AntonP.jpg"),
          univAvatar: require("../assets/polytech.png"),
        },
        {
          fio: "Вячеслав Солдатов",
          university: "НИЯУ МИФИ, Glowbyte",
          info: "Backend разработка, матмоделирование",
          avatar: require("../assets/Slava.jpg"),
          univAvatar: require("../assets/miphi.png"),
        },
        {
          fio: "Кирилл Семенников",
          university: "Московский политех",
          info: "Мобильная разработка, backend разработка, матмоделирование",
          avatar: require("../assets/Kirill.jpg"),
          univAvatar: require("../assets/polytech.png"),
        },
        {
          fio: "Фарис Файзуллин",
          university: "МГТУ им. Н.Э. Баумана",
          info: "Backend разработка, матмоделирование",
          avatar: require("../assets/faris.jpg"),
          univAvatar: require("../assets/bauman.png"),
        },
      ],
      logo: "",
    };
  },
  async mounted() {
    for (let l of "Foxhound") {
      this.logo += l;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  },
  methods: {
    beforeEnter: function (el) {
      Velocity(el, { translateX: "-50px" }, { duration: 0 });
      el.style.opacity = 0;
    },
    enter: function (el, done) {
      var delay = el.getAttribute("index") * 500;
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 1, translateX: "0px" },
          { duration: 1500, complete: done }
        );
      }, delay);
    },
  },
};
</script>

<style scope>
.line-1 {
  border-right: 2px solid transparent;
}

.anim-typewriter {
  animation: blinkTextCursor 500ms 10 normal;
}
@keyframes blinkTextCursor {
  from, to { border-color: transparent }
  50% {
    border-right-color: rgba(0, 0, 0, 0.75);
  }
}
</style>