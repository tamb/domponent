<template>
  <div ref="rootEl" v-bind:style="{ width: width + 'px' }">
    <p>{{ count }}</p>
  </div>
</template>

<script>
import { INTERVAL, AMOUNT } from "../consts.js";
window.globalCounts = [];

export default {
  name: "WaveComponent",
  data: function() {
    return {
      count: 0,
      width: 0,
      reps: 0,
      expanding: true
    };
  },
  mounted() {
    document.addEventListener("stopEvent", () => {
      globalCounts.push(this.state.reps);
    });
    this.$refs.rootEl.style.height = "20px";
    this.$refs.rootEl.style.width = "1px";
    this.$refs.rootEl.style.border = "1px solid";
    setInterval(() => {
      if (this.expanding) {
        this.width = ++this.width;
        this.count = this.count + 1;
        this.reps = this.reps + 1;

        if (this.width >= 250) {
          this.expanding = false;
        }
      } else {
        this.width = --this.width;
        this.count = this.count - 1;
        this.reps = this.reps + 1;

        if (this.width === 0) {
          this.expanding = true;
        }
      }
    }, INTERVAL);
  }
};
</script>
