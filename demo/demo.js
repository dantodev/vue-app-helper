import Vue from 'vue';
import VueRouter from 'vue-router';
import Demo from './Demo.vue';
import VueAppHelper, {registerApp, makeRoute} from '../src/vue-app-helper';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    makeRoute('/', 'home', require('./Home').default)
  ]
});

Vue.use(VueAppHelper, {router});

registerApp('appA', {
  routes: [
    makeRoute('/a', 'a', require('./RouteA').default)
  ],
  hooks: {
    initialize() {
      console.log('initialize app A');
    },
    beforeEnter() {
      console.log('enter app A');
    },
    beforeLeave() {
      console.log('leave app A');
    },
  }
});

registerApp('appB', {
  routes: [
    makeRoute('/b', 'b', require('./RouteB').default)
  ],
  hooks: {
    initialize() {
      console.log('initialize app B');
    },
    beforeEnter() {
      console.log('enter app B');
    },
    beforeLeave() {
      console.log('leave app B');
    },
  }
});

new Vue({
  render: h => h(Demo),
  router
}).$mount('#app');