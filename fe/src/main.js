import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { message } from "ant-design-vue";
import autoFocus from "@directives/autofocus";
import "./styles";
import "@icons";

Vue.config.productionTip = false;

message.config({
  top: "80px"
});
Vue.prototype.$message = message;
Vue.use(autoFocus);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
