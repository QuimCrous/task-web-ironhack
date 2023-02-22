<template>
  <Nav />
  <div class="flex justify-center items-center mt-10">
    <div
      class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 shadow-2xl"
    >
      <div>
        <label
          for="small-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Name:</label
        >
        <input
          type="text"
          id="small-input"
          class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="newName"
        />
      </div>
      <div>
        <label
          for="small-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Nickname:</label
        >
        <input
          type="text"
          id="small-input"
          class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="newNickName"
        />
      </div>
      <div>
        <label
          for="small-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Website:</label
        >
        <input
          type="text"
          id="small-input"
          class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="newWebsite"
        />
      </div>
      <div>
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="file_input"
          >Upload file:</label
        >
        <div v-if="uploaded">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="file_input"
            >file uploaded!</label
          >
        </div>
        <img :src="avatar_url" alt="upload image" />

        <input
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          @change="uploadAvatar"
        />
        <div class="flex justify-center items-center mt-4">
          <button
            @click="modifyProfile"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="fixed bottom-0 left-0 w-full">
    <Footer />
  </div>
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";
import { useRouter } from "vue-router";
import Footer from "../components/Footer.vue";

const userStore = useUserStore();

const loading = ref(false);
const username = ref(null);
const website = ref(null);
const avatar_url = ref(null);
const name = ref(null);
const nick_name = ref(null);

const files = ref();

/* ------- */
const newName = ref(null);
const newWebsite = ref(null);
const newNickName = ref(null);
const uploaded = ref(false);
const path = ref(null);

const redirect = useRouter();

onMounted(() => {
  getProfile();
});

async function getProfile() {
  await userStore.fetchUser();
  username.value = userStore.profile.username;
  avatar_url.value = userStore.avatarPath;
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

const modifyProfile = async () => {
  await userStore.modifyProfile(
    newName.value,
    newWebsite.value,
    newNickName.value,
    path.value
  );
  console.log(path.value);
  newName.value = "";
  newWebsite.value = "";
  newNickName.value = "";
  redirect.push({ path: "/account" });
};

const uploadAvatar = async (evt) => {
  files.value = evt.target.files;

  if (!files.value || files.value.length === 0) {
    throw new Error("You must select an image to upload.");
  }

  const file = files.value[0];
  const fileExt = file.name.split(".").pop();
  const filePath = `${Math.random()}.${fileExt}`;

  let { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, { upsert: false });

  path.value = filePath;
  const { data, error } = await supabase.storage
    .from("avatars")
    .download(filePath);
  avatar_url.value = URL.createObjectURL(data);
  uploaded.value = true;
};
</script>

<style></style>
