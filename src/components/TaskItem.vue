<template>
  <div class="flex flex-col justify-center">
    <h3
      class="block mb-4 text-3xl font-medium text-blue-900 text-center"
      :class="isCompleted"
    >
      {{ task.title }}
    </h3>
    <!-- <p>{{ task.is_complete }}</p> -->
    <p
      class="block mb-4 text-xl font-medium text-blue-900 text-justify"
      :class="isCompleted"
    >
      {{ task.description }}
    </p>
    <div class="flex justify-around">
      <button
        @click="toggleModal"
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Delete
      </button>
      <button
        @click="modifyIsCompleted"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Complete Task
      </button>
      <button
        @click="modifyTaskShow"
        class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
      >
        Modify task
      </button>
    </div>
    <div v-if="modifyTaskBool">
      <div class="mb-6">
        <label for="title" class="block mb-2 text-2xl font-medium text-blue-900"
          >Title:</label
        >
        <input
          type="text"
          id="title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Update Task Title"
          v-model="title"
          required
        />
      </div>
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
        placeholder="Update Task Description"
      ></textarea>
      <div class="mb-4 mt-6">
        <button
          @click="modifyContent"
          class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-2xl w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update!
        </button>
      </div>
    </div>
    <DeleteModal
      v-if="condicion"
      @emit-delete="definitiveDelete"
      @emit-cancel="toggleModal"
    />
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";
import DeleteModal from "../components/DeleteModal.vue";

const taskStore = useTaskStore();

const boolean = ref(false);
const modifyTaskBool = ref(false);
const title = ref("");
const description = ref("");
const isCompleted = ref("");
const condicion = ref(false);

watchEffect(() => {
  if (props.task.is_complete === true) {
    boolean.value = true;
  } else {
    boolean.value = false;
  }
});

const props = defineProps({
  task: Object,
});

// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.
const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
};

const definitiveDelete = () => {
  //Esta función, se llama cuando recibimos la advertencia del emit.
  //1º pasa a false la condición del v-if del componente modal. -> Transiciones. No es obligatorio.
  //2º Llamamos a la función que ahora mismo hace de deleteTask().
  condicion.value = !condicion.value;
  deleteTask();
};

const toggleModal = () => {
  //Esta función sirve tanto para enseñar el modal como para ocultarlo.
  condicion.value = !condicion.value;
};

const modifyIsCompleted = async () => {
  await taskStore.modifyIsCompleted(props.task.id, !boolean.value);
  console.log("click");
};

const modifyTaskShow = () => {
  modifyTaskBool.value = !modifyTaskBool.value;
  console.log(modifyTaskBool.value);
};

const modifyContent = async () => {
  await taskStore.modifyContent(props.task.id, title.value, description.value);
  console.log("click");
  title.value = "";
  description.value = "";
};

watchEffect(() => {
  if (boolean.value === true) {
    isCompleted.value = "text-green-600 line-through";
  } else {
    isCompleted.value = "";
  }
});
</script>

<style></style>

<!--
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or
like an object, up to you.

2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error,
a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit
the new task detail or details[this is in reference of the task title and the task description].

3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the
status[completed, not complted] of the taskItem.

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean
empty variable.

5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the
inputField will be used here to save the value as a prop on this function.

6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional
that first checks if the value of the task [either title and description or just title] is empty which if true it runs the
function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2
back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2;
a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data
property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value
from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field
to an empty string to clear it from the ui.

8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
