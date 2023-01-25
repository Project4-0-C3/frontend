<template>
  <template v-if="event"
    ><h1 class="col text-4xl text-primary-orange">
      {{ event.name }}
    </h1>
    <h2 class="col text-xl mb-6 text-white text-opacity-40">
      {{ event.eventType?.name }}
    </h2>
    <div class="grid">
      <span class="col">{{ event?.date ? formatDate(event?.date) : '' }}</span>
      <span class="col">{{ event?.date ? formatHour(event?.date) : '' }}</span>
      <span class="col">{{ event?.location }}</span>
      <p class="mt-4 col">{{ event?.description }}</p>
    </div>
  </template>
  <div v-if="!event">Kak</div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  props: ['Event'],
  setup(props) {
    const event = props?.Event;

    return { event };
  },
  methods: {
    formatDate(dateString) {
      const date = dayjs(dateString);
      return date.format('DD/MM/YYYY');
    },
    formatHour(dateString) {
      const date = dayjs(dateString);
      return date.format('HH:mm');
    },
  },
};
</script>
