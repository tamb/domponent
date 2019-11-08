import Vue from "vue/dist/vue.esm";
import WaveComponent from "./Wave.vue";

const app = new Vue({
  components: {
    WaveComponent
  },
  el: "#root"
});

console.log(app);
