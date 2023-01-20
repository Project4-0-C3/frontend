<template>
  <router-link
    :to="{ name: 'EventDetails', params: { id: event.eventId } }"
    class="block p-6 rounded-lg shadow-lg bg-primary-gray hover:bg-primary-orange hover:bg-opacity-40 hover:duration-200 duration-200"
  >
    <h5 class="text-xl leading-tight text-primary-orange font-bold ">
      {{ event.name }}
    </h5>
    <p class="font-bold text-black text-lg mb-2">
      {{ event.eventType.name }}
    </p>
    <p class="text-base">
      {{ event.location }}
    </p>
    <p class="text-base">
      {{ formatDate(event.date) }}
    </p>
  </router-link>
</template>
<script setup>
defineProps({
  event: {
    eventId: Number,
    date: Date,
    name: String,
    location: String,
    eventTypeId: Number,
    eventType: { name: String },
  },
});
</script>

<script>
import dayjs from 'dayjs';

export default {
  methods: {
    formatDate(dateString) {
      const date = dayjs(dateString);
      // Then specify how you want your dates to be formatted
      return date.format('DD/MM/YYYY - HH:mm');
    },
  },
};
</script>
