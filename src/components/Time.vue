<template>
  <div>
    {{
      hours.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })
    }}:{{
      minutes.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })
    }}:{{
      seconds.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })
    }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      timer: null,
      testBool: false,
    };
  },
  created() {
    this.startTimer();
  },
  destroyed() {
    this.stopTimer();
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        const now = new Date();
        this.hours = now.getHours();
        this.minutes = now.getMinutes();
        this.seconds = now.getSeconds();
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
  },
};
</script>
