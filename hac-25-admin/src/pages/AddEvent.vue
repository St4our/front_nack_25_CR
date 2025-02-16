<script>
import axios from "axios";
import AppLoader from "../components/AppLoader.vue";
export default {
  name: "AddEvent",
  components: { AppLoader },
  data() {
    return {
      message: "",
      isLoading: false,
      title: "",
      id: this.$route.query.id,
      info: "",
      photo_path: "",
      fileObjects: [],
      imageUrlArray: [],
      isImageArray: [],
      fileNameArray: [],
      fileSizeArray: [],
    };
  },
  methods: {
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
    async add() {
      try {
        this.saveContent();
        let response = await axios.post(`/events`, {
          title: this.title,
          info: this.info,
          photo_path: this.photo_path,
        });
        console.log(response);
        if (response.status == 200) {
          this.message = "Успешно";
        }
        setTimeout(() => {
          this.message = "";
          this.$router.go(-1);
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    },

    async save() {
      try {
        this.saveContent();
        let response = await axios.put(`/events/${this.id}`, {
          title: this.title,
          info: this.info,
          photo_path: this.photo_path,
        });
        console.log(response);
        if (response.status == 200) {
          this.message = "Успешно";
        }
        setTimeout(() => {
          this.message = "";
          this.$router.go(-1);
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    },

    async load_info() {
      try {
        let response = await axios.get(`/events/${this.id}`);
        console.log(response);
        this.title = response.data.title;
        this.photo_path = response.data.photo_path;
        this.info = response.data.info;
      } catch (err) {
        console.log(err);
      }
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

    async deleteAward() {
      try {
        let response = await axios.delete(`/events/${this.id}`);
        console.log(response);
        if (response.status == 200) {
          this.message = "Успешно";
        }
        setTimeout(() => {
          this.message = "";
          this.$router.go(-1);
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    },

    saveContent() {
      try {
        const textarea = document.getElementById("description");
        let content = textarea.value;

        // Заменяем символы переноса строки на HTML-тег br
        content = content.replace(/\n/g, "<br>");

        // Сохраняем отступы с помощью тега pre
        content = content.replace(/^(\s+)/gm, "<pre>$1</pre>");

        this.info = content;

        return content;
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    if (this.id) {
      this.load_info();
    }
  },
};
</script>
<template>
  <AppLoader v-if="isLoading" />
  <div class="card" v-else>
    <h2 class="title" v-if="!id">Добавление события</h2>
    <h2 class="title" v-else>Редактирование события</h2>
    <div class="group">
      <label for="name" class="group-value">Название</label>
      <input
        type="text"
        id="name"
        name="name"
        v-model="title"
        class="group-item"
        placeholder="Введите название"
      />
    </div>
    <div class="group">
      <label for="description" class="group-value">Описание</label>
      <textarea
        v-model="info"
        name="description"
        id="description"
        placeholder="Расскажите подробнее"
        class="group-item"
      ></textarea>
    </div>

    <button
      class="btn continue"
      v-if="!message && !id"
      type="button"
      @click="add()"
    >
      Добавить
    </button>
    <div class="wrap-btns" v-if="!message && id">
      <button class="btn delete" type="button" @click="deleteAward()">
        Удалить
      </button>
      <button class="btn continue" type="button" @click="save()">
        Сохранить
      </button>
    </div>
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
  width: 400px;
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
  text-align: center;
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
  gap: 20px;
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

.delete {
  background-color: #cf0032;
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

.wrap-btns {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
