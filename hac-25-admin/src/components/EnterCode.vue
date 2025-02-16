<script>
import axios from "axios";
import AppLoader from "./AppLoader.vue";
export default {
  name: "EnterCode",
  components: { AppLoader },
  data() {
    return {
      code: "",
      message: "",
    };
  },
  props: {
    email: String,
  },
  methods: {
    async save() {
      try {
        console.log(this.email);
        if (this.code) {
          let response = await axios.post(
            `http://213.139.211.149:4000/v1/auth/verify_code`,
            {
              code: this.code,
              email: this.email,
            }
          );
          console.log(response);
          this.message = response.data.message;
          this.id = response.data.id;
          if (this.id) {
            localStorage.setItem("id", this.id);
            this.$router.push({ name: "applications" });
          }
          setTimeout(() => {
            this.message = "";
          }, 2500);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {},
};
</script>
<template>
  <AppLoader v-if="isLoading" />
  <div class="card" v-else>
    <div class="wrap-title">
      <h2 class="title">Подтверждение почты</h2>
      <span class="subtitle"
        >Введите код, который мы отравили на {{ email }}</span
      >
    </div>
    <div class="group">
      <label for="code" class="group-value">Код</label>
      <input
        type="text"
        id="code"
        name="code"
        v-model="code"
        class="group-item"
        placeholder="Введите код"
      />
    </div>
    <button class="btn continue" type="button" @click="save()">
      Продолжить
    </button>
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}
.card {
  background-color: #fff;
  width: 380px;
  margin: 0 auto;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.wrap-title {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.title {
  font-weight: 400;
  font-size: 24px;
  line-height: 30px;
  color: #14171f;
  font-family: "Unbounded", serif;
  text-align: center;
}
.subtitle {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #14171f;
  text-align: center;
}

.group {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
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

.wrap-btns {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn {
  width: 100%;
  padding: 14.5px 20px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
}

.continue {
  background-color: #df3a44;
  color: #fff;
}

.back {
  background-color: #f8f9fc;
  color: #14171f;
}

.sendAgain {
  font-size: 14px;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0.01em;
  color: #8c93a6;
  text-decoration: underline;
}

.wrap-hr {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
}

.wrap-hr span {
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.01em;
  color: #14171f;
  opacity: 40%;
}

.google {
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: center;
  border: 1px solid #dfe3ec;
}

.google span {
  color: #1e293b;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
}

.password-img {
  position: absolute;
  height: 16px;
  width: 16px;
  cursor: pointer;
  right: 3%;
  top: 55%;
}

@media (max-width: 450px) {
  .card {
    width: 330px;
  }
}
</style>
