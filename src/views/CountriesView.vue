<script></script>

<template>
  <v-text-field label="query" v-model="query" />
  <v-btn icon @click="search">
    <i class="material-icons">search</i>
  </v-btn>
  <v-btn @click="getCountries">Clear search</v-btn>

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
        :src="countries?.flags?.png"
        cover
      >
      </v-img>
      <div class="label">
        {{ countries.name?.common }}
        <v-card-actions
          ><v-btn color="orange-lighten-2" variant="text">
            <i class="material-icons">favorite</i>
          </v-btn></v-card-actions
        >
      </div>
    </v-card>
  </div>
  <p v-if="errorMessage">0 Value !!</p>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      countries: [],
      errorMessage: false,
    };
  },
  methods: {
    async search() {
      const baseUrl = "https://restcountries.com/v3.1";
      const url = `${baseUrl}/name/${this.query}`;
      const response = await fetch(url);
      const data = await response.json();
      this.countries = data;
      if (data.empty) {
        errorMessage = true;
      }
      console.log(data);
    },
    getCountries() {},
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
