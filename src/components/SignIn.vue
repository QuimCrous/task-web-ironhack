<!-- COMPONENTE BOILERPLATE -->

<template>
  <div class="container">
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
