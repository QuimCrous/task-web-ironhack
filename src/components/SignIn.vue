<!-- COMPONENTE BOILERPLATE -->

<template>
  <!-- <div class="container">
    <div class="header">
      <div class="header-description">
        <h3 class="header-title">Log In to ToDo App</h3>
        <p class="header-subtitle">Start organizing your tasks!</p>
      </div>
    </div>

    <form class="form-sign-in" @submit.prevent="signIn">
      <div class="form">
        <div class="form-input">
          <label for="email" class="input-field-label">E-mail</label>
          <input
            type="email"
            class="input-field"
            id="email"
            placeholder="example@example.com"
            required
            v-model="email"
          />
        </div>
        <div class="form-input">
          <label for="password" class="input-field-label">Password</label>
          <input
            type="password"
            id="password"
            class="input-field"
            placeholder="**********"
            v-model="password"
            required
          />
        </div>
        <button type="submit" class="button">Sign In</button>
        <p>
          Dont have an account?
          <PersonalRouter
            :route="route"
            :buttonText="buttonText"
            class="sign-up-link"
          />
        </p>
      </div>
    </form>
  </div> -->
  <div
    class="bg-sky-100 h-screen max-w-screen flex flex-col justify-center items-center"
  >
    <div>
      <div>
        <h3 class="text-2xl">Log In to DONE App</h3>
        <p>Start organizing your tasks!</p>
      </div>
    </div>

    <form>
      <div class="mb-6">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your email</label
        >
        <input
          type="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <div class="mb-6">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your password</label
        >
        <input
          type="password"
          id="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required
          />
        </div>
        <label
          for="remember"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Remember me</label
        >
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { ref, computed } from "vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

// Input Fields
const email = ref("");
const password = ref("");

// Router to push user once SignedIn to Home
const redirect = useRouter();

// Error Message
const errorMsg = ref("");

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    const user = await useUserStore().signIn(email.value, password.value);

    redirect.push({ path: "/" });
  } catch (error) {
    // displays error message
    errorMsg.value = error.message;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
  errorMsg.value = "error";
};
</script>

<style></style>
