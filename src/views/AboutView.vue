<template>
  <TheNavigation />
  <main class="container mx-auto py-6">
  <h1 class="text-4xl text-primary-orange">CrowdCtrl</h1>
  <h2>TEAM C3</h2>
  <ul>
    <li>
      APP
      <ul>
        <li>Jari Van de Vel</li>
        <li>Renzo Beeckmans</li>
      </ul>
    </li>
    <li>
      AI
      <ul>
        <li>Robin Ramaekers</li>
        <li>Lenn van Genechten</li>
      </ul>
    </li>
    <li>
      CCS
      <ul>
        <li>Tim Verbecque</li>
        <li>Jesse Dierckx</li>
      </ul>
    </li>
  </ul></main>
</template>


<script>
import TheNavigation from '@/components/shared/TheNavigation.vue';
export default {
  components: {TheNavigation}
}
</script>