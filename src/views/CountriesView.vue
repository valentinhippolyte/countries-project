<script setup>
import { getCurrentUser, useCurrentUser } from "vuefire";
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
  <div id="section_field">
    <v-text-field
      :loading="loading"
      density="compact"
      variant="solo"
      label="tap a country"
      v-model="searchQuery"
      append-inner-icon="mdi-magnify"
      single-line
      hide-details
      @click:append-inner="search"
      @keydown.enter="search"
    ></v-text-field>
    <v-btn class="field_label" @click="getAll()"
      ><i class="material-icons">close</i></v-btn
    >
  </div>

  <div class="cards">
    <v-card
      :key="country"
      v-for="country in countries"
      class="card"
      max-width="400"
    >
      <v-img
        class="align-end text-white"
        height="200"
        :src="country.flags?.png"
        cover
      >
      </v-img>
      <div class="label">
        {{ country.name?.common }}
        <v-card-actions
          ><v-btn
            v-if="user"
            :icon="country.isFavorite ? 'mdi-cards-heart' : 'mdi-heart-outline'"
            color="primary"
            @click="toggleFavorite(country)"
          >
          </v-btn
        ></v-card-actions>
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
      loaded: false,
      loading: false,
    };
  },
  methods: {
    async getAll() {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      this.countries = response.data;
      for (const country of this.countries) {
        country.isFavorite = await this.isFavorite(country);
      }
    },
    async search() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 1200);
      const baseUrl = "https://restcountries.com/v3.1";
      const url = `${baseUrl}/name/${this.searchQuery}`;
      const response = await fetch(url);
      const data = await response.json();
      this.countries = data;
      for (const country of this.countries) {
        country.isFavorite = await this.isFavorite(country);
      }
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
    await this.getAll();
  },
};
</script>

<style>
#section_field {
  display: flex;
  vertical-align: baseline;
}
.field_label {
  display: inline-block;
  vertical-align: middle;
  border-radius: 0;
}
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
.v-field {
  border-radius: none;
}
.v-btn {
  border-radius: 0;
}
</style>
