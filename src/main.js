import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@mdi/font/css/materialdesignicons.css";

// firebase
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp } from "./firebase";
import { getCurrentUser } from "vuefire";

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
  },
});

app.use(vuetify);

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});

// retrieve user
router.beforeEach(async () => {
  await getCurrentUser();
});

// don't go to login while connected
// Ne pas permettre l'affichage de la vue login si on est déjà conneté
// ⚠ Ceci est juste esthétique
router.beforeEach(async (to) => {
  const currentUser = await getCurrentUser();
  if (to.name === "login" && currentUser) {
    return { name: "home" };
  }
});
app.use(router);

app.mount("#app");
