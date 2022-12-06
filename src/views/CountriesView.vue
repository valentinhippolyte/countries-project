<script></script>

<template>
  <p>This is Countries page</p>
  <v-icon icon="mdi-vuetify" color="black"></v-icon>

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
        <!-- <v-card-title>{{ countries.name.common }}</v-card-title> -->
      </v-img>
      <div class="card_label">
        {{ countries.name.common }}
        <v-card-actions
          ><v-btn class="action" color="orange-lighten-2" variant="text">
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
  vertical-align: middle;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}
.card{
  flex: 0 0 200px;
    margin: 10px;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
}
.card_label{
  display: flex;
  vertical-align: middle;
}
</style>
