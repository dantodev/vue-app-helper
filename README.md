# vue-app-helper

## Installation

```bash
npm install
```

## usage

```js
// in your entry point

import Vue from "vue-router";
import router from "./router";
import VueAppHelper, { registerApp, mageRoute } from "vue-app-helper";

Vue.use(VueAppHelper, { router });

registerApp("backend", {
  routes: [
    // add your routes here like
    makeRoute(
      "login",
      "backend_login",
      () => import(/* webpackChunkName: "backend" */ "./views/LoginView.vue"),
      {
        title: "Login"
      }
    )
  ],
  hooks: {
    initial() {
      // do something on first route enter
    },
    enter() {
      // do something on any route enter
    },
    leave() {
      // do something on any route leave
    }
  }
});
```
