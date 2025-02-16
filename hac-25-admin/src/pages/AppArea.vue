<script>
import axios from "axios";
import AppLoader from "@/components/AppLoader.vue";
export default {
  fio: "AppArea",
  components: { AppLoader },
  data() {
    return {
      cards: [],
      search: "",
      isLoading: false,
    };
  },
  methods: {
    async load_info() {
      try {
        this.isLoading = true;
        let response = await axios.get(`/municipalities`);
        console.log(response);
        this.cards = response.data;
        this.cards.reverse();
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },

    async goSearch() {
      try {
        let response = await axios.get(
          `/municipalities/search?query=${this.search}`
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },

    goEdit(id) {
      try {
        this.$router.push({ name: "area_add", query: { id } });
      } catch (err) {
        console.log(err);
      }
    },

    goAdd() {
      try {
        this.$router.push({ name: "area_add" });
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.load_info();
  },
};
</script>
<template>
  <AppLoader v-if="isLoading" />
  <div class="wrapper" v-else>
    <div class="group-title">
      <h1>Муниципалитеты</h1>
      <button class="btn add_user" @click="goAdd()">Добавить</button>
    </div>
    <div class="actions">
      <img src="../assets/search-support.svg" alt="" class="search-img" />
      <input type="text" class="search" v-model="search" placeholder="Поиск" />
      <button class="btn">Поиск</button>
    </div>
    <div class="fields">
      <span>ID</span>
      <span>Название</span>
      <span>Фото</span>
    </div>
    <div class="cards">
      <div
        class="card"
        @click="goEdit(card.id)"
        v-for="card in cards"
        :key="card.id"
      >
        <span class="card-item">{{ card.id }}</span>
        <span class="card-item">{{ card.title }}</span>
        <span class="card-item" v-if="!card.photo_path">
          <div class="status off">Отсутствует</div>
        </span>
        <span class="card-item status" v-if="card.photo_path">
          <div class="status stable">Есть</div></span
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.group-title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.actions {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
}

.search-img {
  position: absolute;
  left: 16px;
}

.search {
  width: 95%;
  border-radius: 8px;
  border: 1px solid #dfe3ec;
  background-color: #fff;
  padding: 12px 16px 12px 46px;
}

.search::placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #8c93a6;
}

.btn {
  border-radius: 8px;
  padding: 14.5px 20px;
  background-color: #005eff;
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  letter-spacing: 0.01em;
  color: #fff;
}

.add_user {
  background-color: transparent;
  color: #195ee6;
  font-weight: 600;
}

.fields {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.fields span {
  width: 25%;
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  color: rgba(140, 147, 166, 1);
}
.cards {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.card {
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #eff1f6;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-item {
  width: 25%;
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  color: rgba(20, 23, 31, 1);
}

.more {
  width: 30px;
  cursor: pointer;
  padding: 5px;
}

.options-field {
  width: 30px !important;
}

.options {
  position: absolute;
  right: 1%;
  bottom: -100%;
  padding: 5px 6px;
  border-radius: 8px;
  border: 1px solid rgba(223, 227, 236, 1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  z-index: 2;
}

.options button {
  width: 100%;
  padding: 10px 10px 5px 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: rgba(20, 23, 31, 1);
  text-align: left;
}

.delete {
  color: rgba(223, 58, 68, 1) !important;
}

.status {
  width: fit-content;
  border-radius: 38.32px;
  padding: 6px 14px;
  font-weight: 600;
  letter-spacing: 0em;
}

.stable {
  background-color: #f0feed;
  color: #259800;
}

.off {
  background-color: #feeded;
  color: #dc2626;
}
</style>
