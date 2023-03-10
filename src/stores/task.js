import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

// Esta tienda utiliza el Composition API

export const useTaskStore = defineStore("tasks", () => {
  const tasksArr = ref(null);
  const completeArr = ref(null);
  const incompleteArr = ref(null);
  const fetchTasks = async () => {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: false });
    tasksArr.value = tasks;
    completeArr.value = tasks.filter((task) => task.is_complete);
    incompleteArr.value = tasks.filter((task) => !task.is_complete);
    return tasksArr.value;
  };

  const fetchCompletedTasks = async () => {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .eq("is_complete", true)
      .order("id", { ascending: false });
    tasksArr.value = tasks;
    return tasksArr.value;
  };

  const addTask = async (title, description, priority) => {
    console.log(useUserStore().user.id);
    const { data, error } = await supabase.from("tasks").insert([
      {
        user_id: useUserStore().user.id,
        title: title,
        is_complete: false,
        description: description,
        priority: priority,
      },
    ]);
  };

  const modifyIsCompleted = async (id, boolean) => {
    console.log(boolean);
    if (boolean === true) {
      const date = new Date();
      console.log(date);
      const { data, error } = await supabase
        .from("tasks")
        .update({
          is_complete: boolean,
          complete_when: date,
        })
        .match({ id: id });
    } else {
      const { data, error } = await supabase
        .from("tasks")
        .update({
          is_complete: boolean,
          complete_when: null,
        })
        .match({ id: id });
    }
  };

  const modifyContent = async (id, title, description, priority) => {
    if (title !== "" && description !== "") {
      const { data, error } = await supabase
        .from("tasks")
        .update({
          title: title,
          description: description,
          priority: priority,
        })
        .match({ id: id });
    }
    if (title === "" && description !== "") {
      console.log("test2");
      const { data, error } = await supabase
        .from("tasks")
        .update({
          description: description,
          priority: priority,
        })
        .match({ id: id });
    }
    if (title !== "" && description === "") {
      console.log("test3");
      const { data, error } = await supabase
        .from("tasks")
        .update({
          title: title,
          priority: priority,
        })
        .match({ id: id });
    }
    if (title === "" && description === "") {
      console.log("test3");
      const { data, error } = await supabase
        .from("tasks")
        .update({
          priority: priority,
        })
        .match({ id: id });
    }
  };

  const deleteTask = async (id) => {
    const { data, error } = await supabase.from("tasks").delete().match({
      id: id,
    });
  };
  return {
    fetchTasks,
    addTask,
    deleteTask,
    tasksArr,
    modifyIsCompleted,
    modifyContent,
    fetchCompletedTasks,
    completeArr,
    incompleteArr,
  };
});
