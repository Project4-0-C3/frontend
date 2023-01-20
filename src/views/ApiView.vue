<template>
  <div class="grid grid-cols-4 gap-6">
  <EventsComponent/>
  <TeamleadsComponent/>
</div>
</template>

<script>
import EventsComponent from '@/components/events/EventsComponent.vue';
import TeamleadsComponent from '@/components/teamleads/TeamleadsComponent.vue';
export default {
  name: 'AdminHome',
  components: { EventsComponent, TeamleadsComponent },
};
</script>
