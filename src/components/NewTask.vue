<template>
  <div
    class="w-[400px] px-[30px] py-[50px] bg-sky-200 rounded-lg shadow-2xl flex flex-col justify-center items-center"
  >
    <h2 class="block mb-2 text-3xl font-medium text-blue-900 text-center">
      Add a task
    </h2>
    <div class="mb-6 w-80">
      <label for="title" class="block mb-2 text-2xl font-medium text-blue-900"
        >Title:</label
      >
      <input
        type="text"
        id="title"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Add a Task Title - Listen to Kendrick Lamar"
        v-model="name"
        required
      />
    </div>
    <div class="mb-6 w-80">
      <label
        for="priority"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Select a priority category</label
      >
      <select
        id="priority"
        v-model="tagCategory"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="high">High Priority</option>
        <option value="normal">Normal</option>
        <option value="low">Low Priority</option>
      </select>
    </div>
    <div class="mb-6 w-80">
      <label
        for="description"
        class="block mb-2 text-2xl font-medium text-blue-900"
        >Description:</label
      >
      <textarea
        id="description"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        v-model="description"
        placeholder="Add a Task Description - Look up Kendrick Lamar's FEAR album on spotify and listen to the whole album."
      ></textarea>
    </div>
    <div class="mb-4 mt-6">
      <button
        @click="addTask"
        class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-2xl w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add Task
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";

const taskStore = useTaskStore();

// variables para los valors de los inputs
const name = ref("");
const description = ref("");
const tagCategory = ref("normal");

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);

const emits = defineEmits(["refreshTasks"]);

// Arrow function para crear tareas.
const addTask = () => {
  if (name.value.length === 0 || description.value.length === 0) {
    // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.

    showErrorMessage.value = true;
    errorMessage.value = "The task title or description is empty";
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
  } else {
    // Aquí mandamos los valores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.
    console.log(tagCategory.value);
    taskStore.addTask(name.value, description.value, tagCategory.value);
    name.value = "";
    description.value = "";
    tagCategory.value = "normal";
    emits("refreshTasks");
  }
};
</script>

<style></style>
