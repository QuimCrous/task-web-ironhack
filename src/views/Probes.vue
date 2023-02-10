<template>
  <Nav />
  <div v-if="!editBoolean">
    <h1>Name(email): {{ username }}</h1>
    <h2>Website: {{ website }}</h2>
    <h2>True name: {{ name }}</h2>
    <h2>Nickname: {{ nick_name }}</h2>
    <img
      :src="
        avatar_url
          ? avatar_url
          : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
      "
      alt="Profile picture"
    />
    <button @click="editOption">clicka clicka</button>
  </div>
  <div v-else>
    <label for="">name</label
    ><input type="text" name="" id="" v-model="newName" />
    <label for="">website</label
    ><input type="text" name="" id="" v-model="newWebsite" />
    <label for="">avatar url</label
    ><input type="text" name="" id="" v-model="newAvatarUrl" />
    <label for="">nick name</label
    ><input type="text" name="" id="" v-model="newNickName" />
    <button @click="modifyProfile">yo que se</button>
    <button @click="editOption">clicka clicka 2</button>
  </div>
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";

const userStore = useUserStore();

const loading = ref(false);
const username = ref(null);
const website = ref(null);
const avatar_url = ref(null);
const name = ref(null);
const nick_name = ref(null);
const editBoolean = ref(false);

/* ------- */
const newName = ref(null);
const newWebsite = ref(null);
const newNickName = ref(null);
const newAvatarUrl = ref(null);

onMounted(() => {
  getProfile();
});

async function getProfile() {
  await userStore.fetchUser();
  username.value = userStore.profile.username;
  avatar_url.value = userStore.profile.image_src;
  website.value = userStore.profile.website;
  name.value = userStore.profile.name;
  nick_name.value = userStore.profile.nick_name;
}

async function signOut() {
  try {
    loading.value = true;
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

const editOption = () => {
  editBoolean.value = !editBoolean.value;
};

const modifyProfile = async () => {
  await userStore.modifyProfile(
    newName.value,
    newWebsite.value,
    newNickName.value,
    newAvatarUrl.value
  );
  newName.value = "";
  newWebsite.value = "";
  newNickName.value = "";
  newAvatarUrl.value = "";
};
</script>

<style>
img {
  width: 200px;
  border-radius: 50%;
}
</style>
/* ------------------------------------------------------------------ */
<template>
  <nav
    class="bg-sky-200 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-sky-200"
  >
    <div class="container flex flex-wrap items-center justify-between mx-auto">
      <router-link to="/" class="flex items-center">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          class="h-6 mr-3 sm:h-9"
          alt="Done Logo"
        />
        <span
          class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
          >Done!</span
        >
      </router-link>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          >
            hello
          </path>
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-sky-200 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-sky-200 md:dark:bg-sky-200 dark:border-gray-700"
        >
          <li>
            <router-link
              to="/"
              class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
              >Task Manager</router-link
            >
          </li>
          <li>
            <router-link
              to="/account"
              class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >Your Account</router-link
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >Others</a
            >
          </li>
          <li>
            <p
              class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Welcome, {{ userEmail }}
            </p>
          </li>
          <li>
            <button
              @click="signOut"
              class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Log out
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;
//console.log("patata2", userEmail);

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try {
    // call the user store and send the users info to backend to signOut
    // then redirect user to the homeView
    await useUserStore().signOut();
    redirect.push({ path: "/auth/login" });
  } catch (error) {}
};
</script>

<style></style>
