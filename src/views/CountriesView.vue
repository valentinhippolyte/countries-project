<script></script>

<template>
  <v-text-field label="query" v-model="query" />
  <v-btn icon @click="search">
    <i class="material-icons">search</i>
  </v-btn>
  <div class="cards">
    <v-card
      :key="index"
      v-for="(countries, index) in countries"
      class="card"
      max-width="400"
    >
      <v-img
        class="align-end text-white"
        height="200"
        :src="countries.flags.png"
        cover
      >
      </v-img>
      <div class="label">
        {{ countries.name.common }}
        <!-- {{ countries.translations.fra.common }} translate in french  -->

        <v-card-actions
          ><v-btn color="orange-lighten-2" variant="text">
            <i class="material-icons">favorite</i>
          </v-btn></v-card-actions
        >
      </div>
    </v-card>
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
  methods: {
    async search() {
      const basrUrl = "https://restcountries.com/v3.1";
      const url = `${basrUrl}/name/${this.query}`;
      const response = await fetch(url);
      const data = await response.json();
      this.recipes = data;
      console.log(data);
    },
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
.cards {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}
.card {
  flex: 0 0 200px;
  margin: 10px;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
}
.label {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
