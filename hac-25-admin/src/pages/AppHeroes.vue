<script>
import HeroCard from "../components/HeroCard.vue";
import AppLoader from "@/components/AppLoader.vue";
import axios from "axios";
export default {
  name: "AppHeroes",
  components: { HeroCard, AppLoader },
  data() {
    return {
      heroes: [
        {
          id: "1",
          name: "Александр Белоглазов",
          desc: "Командир 604-го Краснознамённого центра специального назначения «Витязь», отдельной дивизии оперативного назначения имени Ф. Э. Дзержинского Федеральной службы войск национальной гвардии Российской Федерации, полковник",
          image: "hero.png",
        },
        {
          id: "2",
          name: "Александр Белоглазов",
          desc: "Командир 604-го Краснознамённого центра специального назначения «Витязь», отдельной дивизии оперативного назначения имени Ф. Э. Дзержинского Федеральной службы войск национальной гвардии Российской Федерации, полковник",
          image: "hero.png",
        },
        {
          id: "3",
          name: "Александр Белоглазов",
          desc: "Командир 604-го Краснознамённого центра специального назначения «Витязь», отдельной дивизии оперативного назначения имени Ф. Э. Дзержинского Федеральной службы войск национальной гвардии Российской Федерации, полковник",
          image: "hero.png",
        },
        {
          id: "4",
          name: "Александр Белоглазов",
          desc: "Командир 604-го Краснознамённого центра специального назначения «Витязь», отдельной дивизии оперативного назначения имени Ф. Э. Дзержинского Федеральной службы войск национальной гвардии Российской Федерации, полковник",
          image: "hero.png",
        },
        // {
        //   id: "5",
        //   name: "Александр Белоглазов",
        //   desc: "Командир 604-го Краснознамённого центра специального назначения «Витязь», отдельной дивизии оперативного назначения имени Ф. Э. Дзержинского Федеральной службы войск национальной гвардии Российской Федерации, полковник",
        //   image: "hero.png",
        // },
      ],
      events: [
        "Специальная военная операция",
        "Военная операция России в Сирии",
        "Первая чеченская война",
        "Афганская война",
        "Великая отечественная война",
      ],
      event: "",
      isLoading: false,
    };
  },
  methods: {
    goAdd() {
      try {
        this.$router.push({ name: "heroes_add" });
      } catch (err) {
        console.log(err);
      }
    },
    async load_info() {
      try {
        this.isLoading = true;
        let response = await axios.get(`/fighters/all`);
        console.log(response);
        this.heroes = response.data.fighters;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
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
  <section class="heroes" v-else>
    <div class="actions">
      <img src="../assets/search-support.svg" alt="" class="search-img" />
      <input type="text" class="search" v-model="search" placeholder="Поиск" />
      <div class="group">
        <label for="surname" class="group-value">Выберите событие</label>
        <select v-model="event" id="" class="group-item">
          <option :value="item" :key="item" v-for="item in events">
            {{ item }}
          </option>
        </select>
      </div>
      <button class="btn">Поиск</button>
    </div>
    <div class="wrap-title">
      <h1>Герои</h1>
      <div class="group-a">
        <a @click="goAdd()" class="showAll">Добавить</a>
        <img src="../assets/arrow-right.svg" alt="" />
      </div>
    </div>
    <div class="wrap-heroes">
      <HeroCard
        class="hero"
        v-for="item in heroes"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :birth_death_years="item.birth_death_years"
        :municipality_id="item.municipality_id"
        :short_info="item.short_info"
        :photo_path="item.photo_path"
        :awards="item.awards"
        :events="item.events"
      />
    </div>
  </section>
</template>
<style scoped>
.heroes {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 40px;
}

.hero {
  width: 24%;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
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
.group {
  width: 150px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3px;
  transform: translateY(-7px);
}

.group-value {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #5b6171;
}

.group-item {
  border-radius: 8px;
  padding: 12px 16px;
  border: 1px solid #dfe3ec;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #5b6171;
}

.group-item::placeholder {
  color: #8c93a6;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
}

.wrap-title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1 {
  font-weight: 700;
  font-size: 32px;
  line-height: 43.71px;
}

.group-a {
  display: flex;
  align-items: center;
  gap: 5px;
}

.showAll {
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: #005eff;
  cursor: pointer;
}

.wrap-heroes {
  width: 100%;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}
@media (max-width: 768px) {
  .wrap-title {
    flex-direction: column;
    gap: 10px;
    align-items: start;
  }
  .actions {
    flex-direction: column;
    align-items: stretch;
  }

  .group {
    width: 100%;
    transform: none;
  }

  .search {
    width: 100%;
  }

  .search-img {
    left: 3%;
    top: 8%;
  }
}

@media (max-width: 500px) {
  .hero {
    width: 100%;
  }
}
</style>
