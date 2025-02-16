<script>
import AppLogo from "./AppLogo.vue";
export default {
  name: "LeftPanel",
  components: { AppLogo },
  data() {
    return {
      routes: [
        {
          img: "applications",
          img_active: "applications_active",
          name: "Заявки",
          active: false,
          route: "applications",
        },
        {
          img: "users",
          img_active: "users_active",
          name: "Пользователи",
          active: false,
          route: "users",
        },
        {
          img: "staff",
          img_active: "staff_active",
          name: "Герои",
          active: false,
          route: "heroes",
        },
        {
          img: "events",
          img_active: "events_active",
          name: "События",
          active: false,
          route: "events",
        },
        {
          img: "awards",
          img_active: "awards_active",
          name: "Награды",
          active: false,
          route: "awards",
        },
        {
          img: "area",
          img_active: "area_active",
          name: "Муниципалитеты",
          active: false,
          route: "area",
        },
        {
          img: "settings",
          img_active: "settings_active",
          name: "Логирование",
          active: false,
          route: "logs",
        },
        {
          img: "nextGis",
          img_active: "nextGis",
          name: "NextGIS",
          active: false,
          route: "nextGis",
        },
      ],
      name: [
        "Заявки",
        "Пользователи",
        "Герои",
        "События",
        "Награды",
        "Муниципалитеты",
        "Логирование",
      ],
    };
  },
  methods: {
    navClick(name) {
      try {
        for (let i = 0; i < this.routes.length; i++) {
          let item = this.routes[i];
          if (item.name == name) {
            item.active = true;
            this.$router.push({ name: item.route });
          } else {
            item.active = false;
          }
          this.routes[i] = item;
        }
      } catch (err) {
        this.$router.push({ name: "404" });
      }
    },

    async checkRoute() {
      let name = this.$route.name;
      console.log(name);
      for (let i = 0; i < this.routes.length; i++) {
        let card = this.routes[i];
        if (card.route == name) {
          card.active = true;
          this.routes[i] = card;
        }
      }
    },
  },
  async mounted() {
    setTimeout(() => {
      this.checkRoute();
    }, 150);
  },
};
</script>
<template>
  <div class="panel">
    <AppLogo />
    <div class="hr"></div>
    <nav class="group-nav">
      <li
        class="nav-item"
        @click="navClick(item.name)"
        v-for="item in routes"
        :key="item"
        :class="{ active: item.active }"
      >
        <img
          v-if="item.active"
          :src="`./assets/${item.img_active}.svg`"
          alt=""
        />
        <img v-if="!item.active" :src="`./assets/${item.img}.svg`" alt="" />
        <span>{{ item.name }}</span>
      </li>
    </nav>
    <div class="footer"></div>
  </div>
</template>
<style scoped>
.panel {
  width: 25%;
  max-width: 310px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.logo {
  margin-top: 20px;
  height: 32px;
}

.group-nav {
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px;
}

.nav-item {
  width: 100%;
  cursor: pointer;
  display: flex;
  gap: 10px;
  align-items: center;
  border-radius: 99px;
  padding: 12px 16px;
  transition: all 500ms ease;
}

.nav-item span {
  font-weight: 600;
  line-height: 20px;
  color: #5b6171;
}

.active {
  background-color: rgba(25, 94, 230, 0.1);
  color: #195ee6;
}

.nav-item img {
  height: 24px;
  width: 24px;
}
</style>
