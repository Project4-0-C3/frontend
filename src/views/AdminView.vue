<template>
  <TheNavigation />
  <main class="container mx-auto p-6">
  <div class="grid grid-cols-3 gap-6">
  <EventsComponent/>
  <!-- <TeamleadsComponent/> -->
</div></main>
</template>

<script>
import EventsComponent from '@/components/events/EventsComponent.vue';
import TheNavigation from '@/components/shared/TheNavigation.vue';
export default {
  name: 'AdminHome',
  components: { EventsComponent, TheNavigation },
};
</script>
