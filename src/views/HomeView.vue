<script setup>
import { useCurrentUser } from "vuefire";
const user = useCurrentUser();
</script>

<template>
  <div id="header">
    <div
      class="d-flex flex-column fill-height justify-center align-center text-white"
    >
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/logo.png"
        width="125"
        height="125"
      />
      <h1 v-if="user" class="text-h4 font-weight-thin mb-4">
        Welcome {{ user.email }}
      </h1>
      <h1 v-if="!user" class="text-h4 font-weight-thin mb-4">Welcome</h1>

      <h4 class="subheading">Discovering the world's countries!</h4>
    </div>
  </div>
</template>

<style>
#header {
  text-align: center;
  margin-top: 50vh;
  transform: translateY(-50%);
}
</style>
