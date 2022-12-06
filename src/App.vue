<script setup>
import { RouterLink, RouterView } from "vue-router";
import { getAuth, signOut } from "firebase/auth";
import { useCurrentUser } from "vuefire";
const user = useCurrentUser();
</script>

<template>
  <v-toolbar title="Application">
    <nav>
      <RouterLink to="/" class="routerLink">Home</RouterLink>
      <RouterLink to="/about" class="routerLink">About</RouterLink>

      <RouterLink v-if="!user" to="/login"
        ><v-btn v-if="!user" variant="outlined" color="orange-lighten-2"
          ><a>Login-Register</a></v-btn
        ></RouterLink
      >
      <v-btn
        v-if="user"
        variant="outlined"
        color="red-lighten-2"
        v-on:click="logout"
        >Logout</v-btn
      >
    </nav>
  </v-toolbar>
  <RouterView />
</template>

<script>
export default {
  methods: {
    async logout() {
      await signOut(getAuth());
    },
  },
};
</script>
<style>
a {
  text-decoration: none;
}
.routerLink{
  color: white;
}
</style>
