<template>
  <div class="wrapper">
    <Nav />

    <div class="flex flex-col mt-8 mb-8 md:m-8 justify-center items-center">
      <div class="content flex flex-row mb-4 text-2xl">
        <h3 class="mr-4">Your account:</h3>
        <router-link to="/account">Account</router-link>
      </div>
      <NewTask @refresh-tasks="getTasks" class="md:w-[800px]" />
      <div
        class="mt-24 pt-10 pb-4 mb-8 pb-16 rounded-lg bg-sky-200 shadow-2xl md:w-[800px]"
      >
        <h1 class="block mb-2 text-3xl font-medium text-blue-900 text-center">
          Tasks
        </h1>
        <div class="flex flex-col items-center">
          <label
            for="small"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Task status select:</label
          >
          <select
            v-model="showSelector"
            id="small"
            class="block w-80 p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incompleted">Incompleted</option>
            <option value="high">High Priority</option>
            <option value="normal">Normal Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
        <div class="flex flex-row justify-around items-center">
          <span
            class="flex items-center text-sm font-medium text-gray-900 dark:text-white"
            ><span
              class="flex w-2.5 h-2.5 bg-green-300 rounded-full mr-1.5 flex-shrink-0"
            ></span
            >Completed</span
          >
          <span
            class="flex items-center text-sm font-medium text-gray-900 dark:text-white"
            ><span
              class="flex w-2.5 h-2.5 bg-red-400 rounded-full mr-1.5 flex-shrink-0"
            ></span
            >High Priority</span
          >
          <span
            class="flex items-center text-sm font-medium text-gray-900 dark:text-white"
            ><span
              class="flex w-2.5 h-2.5 bg-yellow-300 rounded-full mr-1.5 flex-shrink-0"
            ></span
            >Normal Priority</span
          >
          <span
            class="flex items-center text-sm font-medium text-gray-900 dark:text-white"
            ><span
              class="flex w-2.5 h-2.5 bg-green-200 rounded-full mr-1.5 flex-shrink-0"
            ></span
            >Low Priority</span
          >
        </div>
        <div
          v-if="showDelete"
          class="bg-green-200 text-2xl m-4 text-center text-green-700"
        >
          Task deleted correctly!!
        </div>
        <div
          class="flex flex-row flex-wrap justify-around w-[400px] pl-2 md:w-auto md:pl-10 md:pr-10"
        >
          <img
            v-if="showTasks.length === 0"
            src="https://i.imgflip.com/2adszq.jpg"
            alt=""
            class="rounded-lg p-5"
          />
          <TaskItem
            v-for="task in showTasks"
            :key="task.id"
            :task="task"
            class="p-4 m-4 w-80 rounded-lg shadow-2xl"
            @emit-delete-complete="showDeleteComplete"
          />
        </div>
      </div>
    </div>
  </div>
  <div>
    <Footer />
  </div>
  <div class="flex items-center justify-center w-full p-0 m-0">
    <BackToTop class="w-full m-0 p-0" />
  </div>
</template>

<script setup>
import { ref, onUpdated, watchEffect } from "vue";
import { useTaskStore } from "../stores/task";
import { useRouter } from "vue-router";
import Nav from "../components/Nav.vue";
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";
import DeleteModal from "../components/DeleteModal.vue";
import BackToTop from "../components/BackToTop.vue";
import Footer from "../components/Footer.vue";

const taskStore = useTaskStore();

// Variable para guardar las tareas de supabase
const tasks = ref([]);
const showDelete = ref(false);
const completedTasks = ref([]);
const incompletedTasks = ref([]);
const showSelector = ref("all");
const prioritySelector = ref("all");
const showTasks = ref([]);

// Creamos una función que conecte a la store para conseguir las tareas de supabase
const getTasks = async () => {
  await taskStore.fetchTasks();
  tasks.value = taskStore.tasksArr;
  completedTasks.value = taskStore.completeArr;
  incompletedTasks.value = taskStore.incompleteArr;
};

const showDeleteComplete = () => {
  showDelete.value = !showDelete.value;
  setTimeout(() => {
    showDelete.value = !showDelete.value;
  }, 3000);
};

watchEffect(() => {
  if (showSelector.value === "completed") {
    showTasks.value = completedTasks.value;
  }
  if (showSelector.value === "incompleted") {
    showTasks.value = incompletedTasks.value;
  }
  if (showSelector.value === "all") {
    showTasks.value = tasks.value;
  }
  if (showSelector.value === "high") {
    showTasks.value = incompletedTasks.value.filter(
      (task) => task.priority === "high"
    );
  }
  if (showSelector.value === "normal") {
    showTasks.value = incompletedTasks.value.filter(
      (task) => task.priority === "normal"
    );
  }
  if (showSelector.value === "low") {
    showTasks.value = incompletedTasks.value.filter(
      (task) => task.priority === "low"
    );
  }
});

getTasks();

onUpdated(() => {
  getTasks();
});
</script>

<style></style>

<!-- 
**Hints**
1. ref() is used here!
2. (NewTask, TaskItem, Footer, Nav) components are used here! 
3. Tasks are going to be contained in an array here!
4. An async function is needed to get all of the tasks stored within the supabase database, this async function's body will 
contain the tasks value which be use to store the fetchTasks method which lives inside the userTaskStore. This function 
needs to be called within the setUp script in order to run within the first instance of this component lifecycle.

5. NewTask component will receive a customEvent on this instance of the homeView that will fire the add-to-do function
6. add-to-do function will receive 2 params/arguments that will tak a taskTitle and a taskDescription and the body of this 
async function will call the taskStore that calls the addTask function from the store that pushes the info of the task to the 
backEnd. This is possible by passing the 2 param/arguments that will be passed by the user from the inputs within the NewTask 
Component. 

7. TaskItem component will loop through the tasks-array that will print an individual instance of an individual TaskItem 
component. TaskItem will receive 3 customEvents on this instance of the homeView. 1 customEvent for toggling the task to show 
either a text or an icon to display if the task is completed or not completed. 1 customEevent for removing/deleting the 
task out of the array. 1 customEvent for editing the task title and description. This function needs to call the function 
mentioned on hint4.


7.1-customEvent will fire an async function that will take in 1 param/argument. On the body of this function the param/argument 
will be used to define 2 constants. 1 of this constants will take care of setting the boolean value to the opposite of the 
value that checks wether this task is_complete. 1 of this constants will take of calling the id of this specific task in 
order to call the right id. 
7.2-customEvent will fire an asynf function that will take in 1 param/argument. This async function's body will be used to 
call the deleteTaskmethod which will take the param/argument's id in order to delete the task. This function needs to call 
the function mentioned on hint4. 
7.3-customEvent will fire an async function that will take in 1 param/argument. this async function's body will be used to 
take in 2 constants. 1 constant will take in the param/argument newValue. 1 constant will be used to get the param/argument 
oldValue id. These 2 constants will be sent to the backend via the useTaskStore which holds an editTask method. This function 
needs to call the function mentioned on hint4.
-->
