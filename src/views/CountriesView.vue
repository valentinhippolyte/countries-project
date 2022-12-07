<script></script>

<template>
  <v-text-field label="query" v-model="query" />
  <v-btn icon @click="search">
    <i class="material-icons">search</i>
  </v-btn>
  <v-btn @click="getCountries">Clear search</v-btn>

  <div v-if="!searchByName" class="cards">
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
        <v-card-actions
          ><v-btn color="orange-lighten-2" variant="text">
            <i class="material-icons">favorite</i>
          </v-btn></v-card-actions
        >
      </div>
    </v-card>
  </div>
  <div v-if="searchByName" class="cards">
    <v-card class="card" max-width="400">
      <v-img
        v-if="contry?.flags?.png"
        class="align-end text-white"
        height="200"
        :src="country.flags.png"
        cover
      >
      </v-img>
      <div class="label">
        {{ country.name.common }}
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
      countries: [],
      searchByName: null,
      country: {},
    };
  },
  methods: {
    async search() {
      this.searchByName = true;
      const basrUrl = "https://restcountries.com/v3.1";
      const url = `${basrUrl}/name/${this.query}`;
      const response = await fetch(url);
      const data = await response.json();
      this.country = data[0];
      console.log(this.country.flags.png);
    },
    getCountries() {
      this.searchByName = false;
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
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
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
