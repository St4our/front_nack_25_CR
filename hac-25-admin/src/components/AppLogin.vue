<script>
/* eslint-disable */
import AppLogo from "./AppLogo.vue";
import AppLoader from "./AppLoader.vue";
import axios from "axios";
export default {
  name: "AppLogin",
  components: { AppLogo, AppLoader },
  data() {
    return {
      email: "",
      password: "",
      passOpen: false,
      message: "",
      emailInvalid: false,
      passInvalid: false,
      elkAuthUrl: "https://lk.orb.ru/oauth/authorize", // URL авторизации ЕЛК
      clientId: "28", // Ваш client_id
      redirectUri: "http://hackathon-1.orb.ru/callback", // Адрес редиректа
      responseType: "code",
      scope: "email+auth_method", // Запрашиваемые данные
      state: "http://hackathon-1.orb.ru/",
      isLoading: false,
    };
  },
  methods: {
    goBack() {
      try {
        if (this.step > 1) {
          this.step--;
        }
      } catch (err) {
        console.log(err);
      }
    },

    openPass() {
      try {
        let passNode = document.querySelector(`#password`);
        passNode.type = "text";
        this.passOpen = true;
      } catch (err) {
        console.log(err);
      }
    },

    closePass() {
      try {
        let passNode = document.querySelector(`#password`);
        passNode.type = "password";
        this.passOpen = false;
      } catch (err) {
        console.log(err);
      }
    },
    loginWithELK() {
      // Формируем URL для авторизации
      const authUrl = `${this.elkAuthUrl}?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=${this.responseType}&scope=${this.scope}&state=${this.state}`;

      // Перенаправляем пользователя на страницу авторизации ЕЛК
      window.location.href = authUrl;
    },

    async logIn() {
      try {
        if (this.email && this.password) {
          this.isLoading = true;
          let response = await axios.post(
            `http://213.139.211.149:4000/v1/auth/login`,
            {
              email: this.email,
              password: this.password,
            }
          );
          console.log(response);
          if (response.data.status == "ok" && response.data.is_admin) {
            this.$router.push({ name: "enterCode" });
          } else {
            this.message = response.data.detail;
          }
          setTimeout(() => {
            this.message = "";
          }, 3000);
        }
      } catch (err) {
        console.log(err);
        if (err.response.status == 404) {
          this.message = "Пользователь не найден";
        } else {
          this.message = "Ошибка, попробуйте позже!";
        }
        setTimeout(() => {
          this.message = "";
        }, 3000);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {},
};
</script>
<template>
  <AppLoader v-if="isLoading" />
  <div class="wrapper" v-else>
    <div class="card">
      <h2 class="title">Вход</h2>
      <div class="group">
        <label for="email" class="group-value">Почта</label>
        <input
          type="text"
          id="email"
          name="email"
          v-model="email"
          class="group-item"
          placeholder="john@gmail.com"
          @blur="saveEmail"
        />
      </div>
      <div class="group">
        <label for="password" class="group-value">Пароль</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          class="group-item"
          :class="{ invalid: passInvalid }"
          placeholder="Введите пароль"
        />
        <img
          src="../assets/password-closed.png"
          class="password-img"
          alt=""
          v-if="!passOpen"
          @click="openPass()"
        />
        <img
          src="../assets/password-open.png"
          class="password-img"
          alt=""
          v-if="passOpen"
          @click="closePass()"
        />
      </div>
      <button
        class="btn continue"
        v-if="!message"
        type="button"
        @click="logIn()"
      >
        Войти
      </button>
      <div
        class="msg"
        :class="{
          success: this.message == 'Успешно',
          error: this.message != 'Успешно',
        }"
        v-if="message"
      >
        {{ message }}
      </div>
      <div class="wrap-hr">
        <div class="hr"></div>
        <span>или</span>
        <div class="hr"></div>
      </div>
      <button class="btn elk" @click="loginWithELK">Войти через ЕЛК</button>
    </div>
  </div>
</template>
<style scoped>
h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.04em;
}

h1 span {
  color: #005eff;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.04em;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.card {
  width: 380px;
  margin: 0 auto;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  cursor: default;
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
}

.subtitle {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #14171f;
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
  background-color: #005eff;
  color: #fff;
}

.back {
  background-color: #f8f9fc;
  color: #14171f;
}

.wrap-sign {
  display: flex;
  align-items: center;
  gap: 5px;
}

.sign {
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0.01em;
  color: #14171f;
  opacity: 40%;
}

a {
  color: #005eff;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0.01em;
  text-decoration: underline;
  opacity: 100%;
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

.wrap-forgot {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
}

.forgot {
  color: #005eff;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.01em;
}

.invalid {
  border: 1px solid #df3a44;
  color: #df3a44;
}

.g-signin2 {
  height: 100px;
  width: 100%;
}

.elk {
  background: linear-gradient(90deg, #0077b6, #00a896); /* Градиентный фон */
  color: #fff; /* Белый текст */
  border: none; /* Убираем границу */
  border-radius: 8px; /* Скругление углов */
  padding: 14.5px 20px; /* Отступы */
  font-weight: 500; /* Жирный шрифт */
  font-size: 14px; /* Размер шрифта */
  line-height: 19px; /* Высота строки */
  cursor: pointer; /* Курсор в виде указателя */
  display: flex; /* Для центрирования текста */
  align-items: center; /* Вертикальное центрирование */
  justify-content: center; /* Горизонтальное центрирование */
  transition: background 0.3s ease; /* Плавный переход для фона */
}

.elk:hover {
  background: linear-gradient(
    90deg,
    #005f8b,
    #008c7a
  ); /* Темный градиент при наведении */
}

.elk:active {
  background: linear-gradient(
    90deg,
    #004a6d,
    #006b5f
  ); /* Еще более темный градиент при нажатии */
}
@media (max-width: 450px) {
  .card {
    width: 330px;
  }
}
</style>
