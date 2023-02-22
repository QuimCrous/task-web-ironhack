<template>
  <button
    @click="scrollToTop"
    type="button"
    class="text-white bg-sky-800 hover:bg-sky-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-2xl dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 m-0 p-0"
  >
    Scroll to Top
  </button>
</template>

<script setup>
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style scoped></style>
