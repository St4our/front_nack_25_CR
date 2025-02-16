import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router/router";

axios.defaults.baseURL = "http://213.139.211.149:5000/admin_panel";

createApp(App).use(router).mount("#app");
