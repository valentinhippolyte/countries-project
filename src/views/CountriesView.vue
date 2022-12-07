<script setup>
import {
  // useFirestore,
  getCurrentUser,
  // useCollection,
  useCurrentUser,
} from "vuefire";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
const user = useCurrentUser();
</script>

<template>
  <v-text-field label="query" v-model="searchQuery" />
  <v-btn icon @click="search">
    <i class="material-icons">search</i>
  </v-btn>
  <v-btn @click="getAll()">Clear search</v-btn>

  <div class="cards">
    <v-card
      :key="index"
      v-for="(country, index) in countries"
      class="card"
      max-width="400"
    >
      <v-img
        class="align-end text-white"
        height="200"
        :src="country?.flags?.png"
        cover
      >
      </v-img>
      <div class="label">
        {{ country.name?.common }}
        <v-card-actions
          ><v-btn v-if="user" :icon="country.isFavorite ? 'mdi-star-check' : 'mdi-star'" color="primary"
            @click="toggleFavorite(country)">
          </v-btn></v-card-actions>
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
      searchQuery: "",
    };
  },
  methods: {
    getAll() {
      axios.get("https://restcountries.com/v3.1/all").then((response) => {
        this.countries = response.data;
        console.log(this.countries);
      });
    },
    async search() {
      const baseUrl = "https://restcountries.com/v3.1";
      const url = `${baseUrl}/name/${this.searchQuery}`;
      const response = await fetch(url);
      const data = await response.json();
      this.countries = data;
    },
    async isFavorite(country) {
      const db = getFirestore();
      const currentUser = await getCurrentUser();
      const collectionName = `favorties-${currentUser.uid}`;
      const q = query(
        collection(db, collectionName),
        where("name", "==", country.name.common)
      );
      const querySnapshot = await getDocs(q);
      console.log("is Favorite: ", !querySnapshot.empty);
      return !querySnapshot.empty;
    },
    async toggleFavorite(country) {
      const db = getFirestore();
      const currentUser = await getCurrentUser();
      const collectionName = `favorties-${currentUser.uid}`;
      if (!country.isFavorite) {
        await addDoc(collection(db, collectionName), {
          name: country.name.common,
        });
      } else {
        const q = query(
          collection(db, collectionName),
          where("name", "==", country.name.common)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (document) => {
          await deleteDoc(doc(db, collectionName, document.id));
        });
      }
      country.isFavorite = !country.isFavorite;
    },
  },
  async mounted() {
    this.getAll();
    for (const country of this.countries) {
      country.isFavorite = await this.isFavorite(country);
    }
    console.table(this.countries);
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
