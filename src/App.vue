<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <v-toolbar title="Application">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <v-btn @click="toggleTheme">toggle theme</v-btn>
  </v-toolbar>
  <RouterView />
</template>

<script></script>
<style scoped></style>
