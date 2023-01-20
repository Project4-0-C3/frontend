<template>
  <div class="w-full mb-3">
    <button @click="$router.go(-1)" class="hover:underline text-primary-orange">
      Go back
    </button>
  </div>
  <div class="grid">
    <h1 class="row text-4xl text-primary-orange">
      {{ event.name }}
    </h1>
    <h2 class="row text-xl mb-6 text-white text-opacity-40">
      {{ event.eventType?.name }}
    </h2>
    <div class="grid">
      <span class="col">{{ formatDate(event.date) }}</span>
      <span class="col">{{ formatHour(event.date) }}</span>
      <span class="col">{{ event.location }}</span>
      <p class="mt-4 col">{{ event.description }}</p>
    </div>
    <div class="grid grid-cols-2 mt-4">
      <div class="col">
        <h2 class="text-xl text-primary-orange mb-2">People on the job</h2>
        <div v-for="e in event.eventUsers">
          {{ e }}
          <span class="text-red-500">{{
            e.user ? e.user : 'User is still null'
          }}</span>
        </div>
      </div>
      <div class="col">
        <h2 class="text-xl text-primary-orange mb-2">Used Microphones</h2>

        <div v-for="e in event.eventRecordingDevices">
          {{ e.placementName }}
          <span class="text-red-500">{{
            e.recordingDevice
              ? e.recordingDevice
              : 'recordingDevice is still null'
          }}</span>
        </div>
      </div>
      <div class="col-span-2">
        <h2 class="text-xl text-primary-orange mb-2">Groups</h2>

        <div v-for="e in event.groups">
          {{ e.name }}
          <span class="text-red-500">{{
            e.groupGuards ? 'groupGuards is still null' : e.groupGuards
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  props: ['id'],
  name: 'EventDetails',
  methods: {
    getDetails() {
      fetch(`https://localhost:7100/api/Event/${this.id}`)
        .then((res) => res.json())
        .then((data) => (this.event = data))
        .catch((err) => console.log('retrieve event: ', err));
      // console.log('mounted')
    },
    formatDate(dateString) {
      const date = dayjs(dateString);
      // Then specify how you want your dates to be formatted
      return date.format('DD/MM/YYYY');
    },
    formatHour(dateString) {
      const date = dayjs(dateString);
      // Then specify how you want your dates to be formatted
      return date.format('HH:mm');
    },
  },
  data() {
    // console.log('data')
    return { event: {} };
  },
  async mounted() {
    await this.getDetails();
  },
};
</script>
