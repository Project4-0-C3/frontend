<template>
  <div class="grid grid-cols-3 gap-6">
  <EventsComponent/>
</div>
</template>

<script>
import EventsComponent from '@/components/events/EventsComponent.vue';
export default {
  name: 'AdminHome',
  components: { EventsComponent, TeamleadsComponent },
};
</script>
