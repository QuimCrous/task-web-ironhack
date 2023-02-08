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
