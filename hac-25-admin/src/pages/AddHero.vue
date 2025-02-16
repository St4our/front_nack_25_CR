<script>
import axios from "axios";
import AppLoader from "../components/AppLoader.vue";
export default {
  name: "AddHero",
  components: { AppLoader },
  data() {
    return {
      message: "",
      isLoading: false,
      date_from: "",
      date_to: "",
      desc: "",
      fileObjects: [],
      imageUrlArray: [],
      isImageArray: [],
      fileNameArray: [],
      fileSizeArray: [],
      awards: [],
      coordinates: "",
      awards_selected: [],
      events: [],
      events_selected: "",
      municipalities: [],
      municipality: "",
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

    async load_awards() {
      try {
        let response = await axios.get(`/awards`);
        this.awards = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async load_events() {
      try {
        let response = await axios.get(`/events`);
        this.events = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async load_muni() {
      try {
        let response = await axios.get(`/municipalities`);
        this.municipalities = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    formatDate(inputDate) {
      // Создаем объект Date из входной даты
      if (inputDate) {
        const date = new Date(inputDate);

        // Получаем день, месяц и год
        const day = String(date.getDate()).padStart(2, "0"); // День (добавляем ведущий ноль, если нужно)
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяц (нумерация с 0, поэтому +1)
        const year = date.getFullYear(); // Год

        // Возвращаем дату в формате дд.мм.гггг
        return `${day}.${month}.${year}`;
      }
    },
    formatCoordinates() {
      if (!this.coordinates) return;

      // Удаляем все лишние символы, оставляем только цифры, точку и запятую
      let formatted = this.coordinates.replace(/[^0-9.,-]/g, "");

      // Разбиваем на широту и долготу
      let parts = formatted.split(",");
      if (parts.length === 2) {
        let lat = parseFloat(parts[0]).toFixed(6); // Округляем до 6 знаков
        let lon = parseFloat(parts[1]).toFixed(6);
        if (!isNaN(lat) && !isNaN(lon)) {
          this.coordinates = `${lat}, ${lon}`;
        }
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0]; // Получаем первый выбранный файл

      if (file) {
        // Очищаем массивы перед добавлением нового файла
        this.fileObjects = [file];
        this.imageUrlArray = [];
        this.isImageArray = [];
        this.fileNameArray = [];
        this.fileSizeArray = [];

        // Проверяем, является ли файл изображением
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imageUrlArray.push(e.target.result); // Добавляем URL изображения
            this.isImageArray.push(true);
          };
          reader.readAsDataURL(file);
        } else {
          this.isImageArray.push(false);
        }

        // Добавляем имя и размер файла
        this.fileNameArray.push(file.name);
        this.fileSizeArray.push(this.formatFileSize(file.size));
      }
      this.upload_file();
    },
    formatFileSize(bytes) {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    },
    async upload_file() {
      try {
        const formData = new FormData();
        if (this.fileObjects.length > 0) {
          formData.append("file", this.fileObjects[0]);
        }
        let response = await axios.post(
          `http://213.139.211.149:4000/v1/files/upload_file`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        this.photo_path = response.data.filename;
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.load_awards();
    this.load_events();
    this.load_muni();
  },
};
</script>
<template>
  <AppLoader v-if="isLoading" />
  <div class="card" v-else>
    <h2 class="title">Расскажите о герое</h2>
    <div class="group">
      <label for="fio" class="group-value">ФИО</label>
      <input
        type="text"
        id="fio"
        name="fio"
        v-model="fio"
        class="group-item"
        placeholder="Введите ФИО"
      />
    </div>
    <div class="group">
      <label for="fio" class="group-value">Координаты места захоронения</label>
      <input
        type="text"
        id="fio"
        name="fio"
        v-model="coordinates"
        @blur="formatCoordinates"
        class="group-item"
        placeholder="Введите координаты"
      />
    </div>
    <div class="date-group">
      <div class="group">
        <label for="date_from" class="group-value">Года жизни</label>
        <input
          type="date"
          id="date_from"
          name="date_from"
          v-model="date_from"
          class="group-item"
        />
      </div>
      -
      <div class="group">
        <label for="date_to" class="group-value">гг.</label>
        <input
          type="date"
          id="date_to"
          name="date_to"
          v-model="date_to"
          class="group-item"
        />
      </div>
    </div>
    <div class="group">
      <label for="desc" class="group-value">Описание</label>
      <textarea
        v-model="desc"
        name="desc"
        id="desc"
        placeholder="Расскажите подробнее"
        class="group-item"
      ></textarea>
    </div>
    <div class="group">
      <label for="awards" class="group-value">Награда</label>
      <select
        name="awards"
        class="group-item"
        id="awards"
        v-model="awards_selected"
      >
        <option :value="award.id" :key="award.id" v-for="award in awards">
          {{ award.name }}
        </option>
      </select>
    </div>
    <!-- Отображение выбранных наград -->
    <div v-if="awards_selected.length > 0" class="selected-awards">
      <h3>Выбранные награды:</h3>
      <ul>
        <li v-for="awardId in awards_selected" :key="awardId">
          {{ awards.find((a) => a.id === awardId)?.name }}
        </li>
      </ul>
    </div>
    <div class="group">
      <label for="events" class="group-value">События</label>
      <select
        name="events"
        id="events"
        class="group-item"
        v-model="events_selected"
      >
        <option :value="event.id" :key="event.id" v-for="event in events">
          {{ event.title }}
        </option>
      </select>
    </div>
    <div class="group-file">
      <input
        type="file"
        id="file"
        @change="handleFileUpload"
        accept="image/*"
        multiple
      />
      <label class="select-img img-text" for="file"
        >Прикрепить изображения</label
      >
    </div>
    <div v-if="imageUrlArray.length > 0" class="image-container">
      <img :src="imageUrlArray[0]" alt="Uploaded Image" />
    </div>
    <div v-else-if="fileNameArray.length > 0" class="file-container">
      <span>{{ fileNameArray[0] }}</span>
      <br />
      <small>{{ fileSizeArray[0] }}</small>
    </div>
    <div class="image-container" v-else-if="photo_path">
      <img :src="`http://213.139.211.149:4000/files/${photo_path}`" alt="" />
    </div>
    <button class="btn continue" v-if="!message" type="button" @click="logIn()">
      Продолжить
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

.date-group {
  display: flex;
  align-items: center;
  gap: 7px;
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

input[type="file"] {
  border: none;
  display: none;
}

.group-file {
  padding: 15px 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.9px dashed #14171f;
  border-radius: 8px;
}

.img-text {
  width: 100%;
  text-align: center;
  cursor: pointer;
}
.image-container {
  margin: 0 auto;
  max-width: 400px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.file-container {
  display: flex;
  align-items: center;
  gap: 7px;
}

.selected-awards {
  margin-top: 10px;
}

.selected-awards h3 {
  font-size: 14px;
  font-weight: 500;
  color: #5b6171;
}

.selected-awards ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.selected-awards li {
  font-size: 14px;
  color: #14171f;
  padding: 5px 0;
}
</style>
