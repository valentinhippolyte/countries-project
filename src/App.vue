<script setup>
import { RouterLink, RouterView } from "vue-router";
import { getAuth, signOut } from "firebase/auth";
import { useCurrentUser } from "vuefire";
const user = useCurrentUser();
</script>

<template>
  <v-parallax src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
    <v-toolbar id="toolbar" title="Countries App">
      <nav>
        <RouterLink to="/" class="routerLink">Home</RouterLink>
        <RouterLink to="/countries" class="routerLink">Countries</RouterLink>

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
  </v-parallax>
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
.routerLink {
  color: white;
  margin-right: 40px;
}
.v-toolbar {
  display: block;
  position: fixed;
  margin-top: 0px;
  top: 0px;
  left: 0px;
  width: 100%;
}
.v-parallax {
  min-height: 100%;
}
</style>
