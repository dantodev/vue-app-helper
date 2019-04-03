import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import VueAppHelper from "./vue-app-helper";

Vue.use(VueRouter);

const router = new VueRouter({});

Vue.use(VueAppHelper, { router });

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
