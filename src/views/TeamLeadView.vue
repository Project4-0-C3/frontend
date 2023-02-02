<template>
  <TheNavigation />
  <main class="container mx-auto py-6">
  <div class="grid grid-cols-3 gap-6">
  <EventsComponent/>
</div></main>
</template>

<script>
import TheNavigation from '@/components/shared/TheNavigation.vue';
import EventsComponent from '@/components/events/EventsComponent.vue';
export default {
  name: 'AdminHome',
  components: { EventsComponent, TheNavigation },
};
</script>
