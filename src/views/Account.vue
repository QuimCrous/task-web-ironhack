<template>
  <Nav />
  <div class="flex justify-center items-center mt-10">
    <div
      class="w-[400px] px-[30px] py-[50px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div>
        <div
          v-if="loadedValue"
          class="flex flex-col justify-center items-center"
        >
          <div class="text-center">
            <img
              :src="
                avatar_url
                  ? avatar_url
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
              "
              alt="Profile picture"
              class="h-[200px] w-[200px] object-cover rounded-full"
            />
          </div>
          <div>
            <h1 class="mt-4 text-xl font-bold text-center">{{ name }}</h1>
            <h2 class="mt-4 text-xl">Nickname: {{ nick_name }}</h2>
            <h2 class="mt-4 text-xl">Website: {{ website }}</h2>
            <h2 class="mt-4 text-xl">Email: {{ username }}</h2>
          </div>

          <button
            @click="editOption"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
          >
            Edit Profile
          </button>
        </div>
        <div v-else>
          <div
            role="status"
            class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center flex-col"
          >
            <div class="text-center justify-center flex">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                alt="Profile picture"
                class="h-[200px] w-[200px] rounded-full"
              />
            </div>
            <div class="w-full">
              <div
                class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-6 mt-4"
              ></div>
              <div
                class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-6"
              ></div>
              <div
                class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-6"
              ></div>
              <div
                class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-6"
              ></div>
              <div
                class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-6"
              ></div>
              <div
                class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-6"
              ></div>
              <div
                class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-6"
              ></div>
              <div
                class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"
              ></div>
            </div>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();

const loadedValue = ref(false);
const username = ref(null);
const website = ref(null);
const avatar_url = ref(null);
const name = ref(null);
const nick_name = ref(null);
const redirect = useRouter();

onMounted(() => {
  getProfile();
  // setTimeout(() => {
  //   loading.value = true;
  // }, 1000);
});

async function getProfile() {
  await userStore.fetchUser();
  username.value = userStore.profile.username;
  avatar_url.value = userStore.avatarPath;
  website.value = userStore.profile.website;
  name.value = userStore.profile.name;
  nick_name.value = userStore.profile.nick_name;
  loadedValue.value = true;
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
  console.log("click");
  redirect.push({ path: "/edit" });
};
</script>

<style scoped>
/* img {
  width: 200px;
  border-radius: 50%;
} */
</style>
