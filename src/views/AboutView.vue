<script></script>

<template>
  <p>This is an About page</p>
  <v-icon icon="mdi-vuetify" color="black"></v-icon>

  <v-card class="mx-auto" max-width="400">
    <v-img
      class="align-end text-white"
      height="200"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      cover
    >
      <v-card-title>France</v-card-title>
    </v-img>
    <div class="action">
      <v-card-actions
        ><v-btn color="orange-lighten-2" variant="text">
          <i class="material-icons">edit</i>
        </v-btn></v-card-actions
      >

      <v-card-actions
        ><v-btn color="orange-lighten-2" variant="text">
          <i class="material-icons">delete</i>
        </v-btn></v-card-actions
      >
    </div>
  </v-card>
  <div :key="index" v-for="(countries, index) in countries">
    <h1>{{ countries.name.common }}</h1>
    <img :src="countries.flags.png" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      countries: null,
    };
  },
  mounted() {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      this.countries = response.data;
      console.log(this.countries);
    });
  },
};
</script>

<style>
.action {
  display: flex;
  text-align: right;
}
</style>
