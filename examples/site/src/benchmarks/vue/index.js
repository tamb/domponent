import Vue from "vue/dist/vue.esm";
import WaveComponent from "./Wave.vue";

const app = new Vue({
  components: {
    WaveComponent
  },
  el: "#root"
});

const stopEvent = new Event("stopEvent");
setTimeout(function() {
  document.dispatchEvent(stopEvent);
}, 60000);
