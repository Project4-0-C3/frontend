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
        {{ group.name }}
        <span class="text-sm text-white text-opacity-40">{{
          group.zone?.name
        }}</span>
      </h1>
      <div class="col grid mt-6">
        <h2 class="text-xl text-primary-orange mb-2">
          Microphones
          <span class="text-xs text-white text-opacity-40">
            {{ group.zone?.eventRecordingDevices.length }} Microphones
          </span>
        </h2>
        <div class="grid grid-cols-6 xl:grid-cols-8 gap-2">
          <GroupMicModalComponent :EventId="group.eventId" v-if="group.eventId" />
          <EventRecordingDeviceCardComponent
            v-for="g in group.zone?.eventRecordingDevices"
            :recordingDevice="g"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import EventRecordingDeviceCardComponent from '@/components/microphones/EventRecordingDeviceCardComponent.vue';
import axios from 'axios';
import TheNavigation from '@/components/shared/TheNavigation.vue';
import GroupMicModalComponent from '@/components/microphones/GroupMicModalComponent.vue';

export default {
  components: {
    EventRecordingDeviceCardComponent,
    TheNavigation,
    GroupMicModalComponent,
  },
  props: ['id'],
  name: 'GroupDetails',
  methods: {
    getDetails() {
      // fetch(`https://localhost:7100/api/Group/${this.id}`)
      //   .then((res) => res.json())
      //   .then((data) => (this.group = data))
      axios
        .get(`${process.env.VUE_APP_BASE_URL}Group/${this.id}`)
        .then((res) => (this.group = res.data))
        .catch((err) => console.log('retrieve group: ', err));
      // console.log('mounted')
    },
  },
  data() {
    // console.log('data')
    return { group: {} };
  },
  async mounted() {
    await this.getDetails();
  },
};
</script>
