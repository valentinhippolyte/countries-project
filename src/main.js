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

// Pour récupérer l'utilisateur actuel. A mettre avant le app.use(router)
router.beforeEach(async () => {
  await getCurrentUser();
});

app.use(router);

app.mount("#app");
