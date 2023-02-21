<template>
  <TheNavigation />
  <main class="container mx-auto py-6">
    <div class="w-full mb-3">
      <button
        @click="$router.go(-1)"
        class="hover:underline text-primary-orange"
      >
        Go back
      </button>
    </div>
    <div class="grid">
      <h1 class="col text-4xl text-primary-orange">
        {{ zone.name }}
        <span class="text-sm text-white text-opacity-40">zone </span>
      </h1>
      <div class="col grid mt-6">
        <h2 class="text-xl text-primary-orange mb-2">
          Microphones
          <span class="text-xs text-white text-opacity-40">
            {{ zone.eventRecordingDevices?.length }} Microphones
          </span>
        </h2>
        <div class="grid grid-cols-6 xl:grid-cols-8 gap-2">
          <ZoneMicModalComponent :ZoneId="zone.zoneId" :RD="zone.event?.eventRecordingDevices" />
          <ZoneEventRecordingDeviceCardComponent
            v-for="rd in zone.eventRecordingDevices"
            :recordingDevice="rd"
          />
        </div>
      </div>
    </div>

    {{ zone.event }}
  </main>
</template>

<script>
import ZoneEventRecordingDeviceCardComponent from '@/components/microphones/ZoneEventRecordingDeviceCardComponent.vue';
import axios from 'axios';
import TheNavigation from '@/components/shared/TheNavigation.vue';
import ZoneMicModalComponent from '@/components/microphones/ZoneMicModalComponent.vue';

export default {
  components: {
    ZoneEventRecordingDeviceCardComponent,
    TheNavigation,
    ZoneMicModalComponent,
  },
  props: ['id'],
  name: 'GroupDetails',
  methods: {
    getDetails() {
      // fetch(`https://localhost:7100/api/zone/${this.id}`)
      //   .then((res) => res.json())
      //   .then((data) => (this.zone = data))
      axios
        .get(`${process.env.VUE_APP_BASE_URL}zone/${this.id}`)
        .then((res) => (this.zone = res.data))
        .catch((err) => console.log('retrieve zone: ', err));
      // console.log('mounted')
    },
  },
  data() {
    // console.log('data')
    return { zone: {} };
  },
  async mounted() {
    await this.getDetails();
  },
};
</script>
