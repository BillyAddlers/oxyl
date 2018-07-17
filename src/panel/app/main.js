import createRouter from "./router/index";
import pace from "pace-progress";
import registerComponents from "./components/index";
import Vue from "vue";

pace.start();
registerComponents(Vue);

window.app = new Vue({ router: createRouter(Vue) }).$mount("#app");