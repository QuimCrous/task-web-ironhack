<script setup>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Nav from "../components/Nav.vue";
import { onMounted, ref, toRefs, watchEffect } from "vue";
import { useTaskStore } from "../stores/task";
import BackToTop from "../components/BackToTop.vue";
import Footer from "../components/Footer.vue";

const completedTasks = ref([]);
const taskStore = useTaskStore();
const showSelector = ref("200");
const imageStatus = ref("https://http.cat/200");
const statusArray = ref([
  "100",
  "101",
  "102",
  "103",
  "201",
  "202",
  "203",
  "204",
  "206",
  "207",
  "300",
  "301",
  "302",
  "303",
  "304",
  "305",
  "307",
  "308",
  "400",
  "401",
  "402",
  "403",
  "404",
  "405",
  "406",
  "407",
  "408",
  "409",
  "410",
  "411",
  "412",
  "413",
  "414",
  "415",
  "416",
  "417",
  "418",
  "420",
  "421",
  "422",
  "423",
  "424",
  "425",
  "426",
  "429",
  "431",
  "444",
  "450",
  "451",
  "497",
  "498",
  "499",
  "500",
  "501",
  "502",
  "503",
  "504",
  "506",
  "507",
  "508",
  "509",
  "510",
  "511",
  "521",
  "522",
  "523",
  "525",
  "599",
]);

const loadEvents = async () => {
  completedTasks.value = await taskStore.fetchCompletedTasks();

  const calendarEvents = completedTasks.value.map((task) => ({
    start: task.complete_when.split("T")[0],
    display: "background",
    backgroundColor: "#6cb2eb", // Color de fondo de los días con tareas completadas
  }));

  return calendarEvents;
};

const calendarOptions = {
  plugins: [dayGridPlugin],
  initialView: "dayGridMonth",
  events: loadEvents,
  height: 650,
};

watchEffect(() => {
  if (showSelector) {
    imageStatus.value = `https://http.cat/${showSelector.value}`;
  }
});
</script>

<template>
  <Nav />
  <div class="p-10">
    <p class="text-2xl text-center pb-2">Completed Tasks Calendar</p>
    <p class="text-xl text-center pb-10">show how many task are completed</p>
    <div class="p-5 shadow-2xl rounded-lg">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
  <div class="flex flex-col items-center pt-10">
    <p class="text-2xl text-center pb-2">HTTP.cat</p>
    <p class="text-xl text-center pb-10">
      Learn status codes with this funny cat images
    </p>
    <label
      for="small"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >HTTP status respond:</label
    >
    <select
      v-model="showSelector"
      id="small"
      class="block w-80 p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option selected value="200">200</option>
      <option v-for="(item, index) in statusArray" :value="item">
        {{ item }}
      </option>
    </select>
    <img
      :src="imageStatus"
      alt="status_cat_img"
      class="shadow-2xl rounded-lg mb-5"
    />
  </div>
  <div>
    <Footer />
  </div>
  <div class="flex items-center justify-center w-full p-0 m-0">
    <BackToTop class="w-full m-0 p-0" />
  </div>
</template>
<style scoped></style>
