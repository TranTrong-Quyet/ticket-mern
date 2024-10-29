import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores/index.js";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Lara from "@primevue/themes/lara";
import "./assets/main.css";

// Add these PrimeVue style imports

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Lara,
    options: {
      cssLayer: {
        name: "primevue",
        order: "tailwind-base, primevue, tailwind-utilities",
      },
    },
  },
}),
  app.use(ToastService);
app.use(pinia);
app.use(router);

app.mount("#app");
