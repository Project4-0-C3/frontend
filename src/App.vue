import Navigation from './components/Navigation.vue';

<template>
  <!-- <TheNavigation />
  <main :class="$route.path == '/login' ? '' : 'container mx-auto py-6'">
    <router-view />
  </main> -->
  <router-view />
</template>

<!-- <script>
import TheNavigation from './components/shared/TheNavigation.vue';
export default {
  components: { TheNavigation },
};
</script> -->

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffff;
}

#appColor {
  background-color: #1e1e1e;
}

nav a.router-link-exact-active {
  color: #de6107;
}
</style>
