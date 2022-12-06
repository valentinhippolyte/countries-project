<script></script>
<template>
  <div class="flex-container">
    <div class="text-center">
      <h1>
        <span class="fade-in" id="digit1">4</span>
        <span class="fade-in" id="digit2">0</span>
        <span class="fade-in" id="digit3">4</span>
      </h1>
      <h3 class="fadeIn">PAGE NOT FOUND</h3>
      <button type="button" name="button">
        <RouterLink to="/" class="notFoundLink">Return To Home</RouterLink>
      </button>
    </div>
  </div>
</template>

<style>
.notFoundLink {
  color: white;
}
.flex-container {
  margin-top: 50vh;
  /* poussé de la moitié de hauteur de viewport */
  transform: translateY(-50%);
  /* tiré de la moitié de sa propre hauteur */
}
</style>
