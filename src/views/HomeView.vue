<script setup>
import { useCurrentUser } from "vuefire";
const user = useCurrentUser();
</script>

<template>
  <div id="header">
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.jpg"
      width="125"
      height="125"
    />

    <div>
      <h1>Countries APP</h1>
      <p v-if="user">Welcome {{ user.email }}</p>
    </div>
  </div>
</template>

<style>
#header {
  text-align: center;
}
</style>
