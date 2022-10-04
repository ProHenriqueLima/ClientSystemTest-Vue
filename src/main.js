import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.min.css";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  Swal,
  render: (h) => h(App),
}).$mount("#app");
