<template>
  <TheNavigation />
  <main class="container mx-auto py-6">
  <h1 class="text-4xl text-primary-orange">CrowdCtrl</h1>
  <h2 class="py-3">TEAM C3</h2>
  <ul class="list">
    <li class="list-outside">
      APP
      <ul class="list">
        <li class="list-inside list-disc">Jari Van de Vel</li>
        <li class="list-inside list-disc">Renzo Beeckmans</li>
      </ul>
    </li>
    <li class="list-outside">
      AI
      <ul class="list-inside list-disc">
        <li class="list-inside list-disc">Robin Ramaekers</li>
        <li class="list-inside list-disc">Lenn van Genechten</li>
      </ul>
    </li>
    <li class="list-outside">
      CCS
      <ul class="list">
        <li class="list-inside list-disc">Tim Verbecque</li>
        <li class="list-inside list-disc">Jesse Dierckx</li>
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