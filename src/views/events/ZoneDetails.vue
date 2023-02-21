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
          Unnassigned Microphones
          <span class="text-xs text-white text-opacity-40">
            {{ unassignedMics?.length }} Microphones
          </span>
        </h2>
        <div class="grid grid-cols-6 xl:grid-cols-8 gap-2">
          <ZoneEventRecordingDeviceCardComponent
            v-for="rd in unassignedMics"
            :zoneId="zone.zoneId"
            @updateDevice="updateDevice"
            :recordingDevice="rd"
          />
        </div>
      </div>
      <div class="col grid mt-6">
        <h2 class="text-xl text-primary-orange mb-2">
          Assigned Microphones
          <span class="text-xs text-white text-opacity-40">
            {{ assignedMics?.length }} Microphones
          </span>
        </h2>
        <div class="grid grid-cols-6 xl:grid-cols-8 gap-2">
          <ZoneEventRecordingDeviceCardComponent
            :zoneId="zone.zoneId"
            @updateDevice="updateDevice"
            v-for="rd in assignedMics"
            :recordingDevice="rd"
          />
        </div>
      </div>
      <div class="col grid mt-6">
        <h2 class="text-xl text-primary-orange mb-2">
          Unnassigned Guards
          <span class="text-xs text-white text-opacity-40">
            {{ unassignedUsers?.length }} Guards
          </span>
        </h2>
        <div class="grid grid-cols-4 xl:grid-cols-8 gap-2">
          <ZoneEventUserCardComponent
            :zoneId="zone.zoneId"
            @updateUser="updateUser"
            v-for="g in unassignedUsers"
            :guard="g"
          />
        </div>
      </div>
      <div class="col grid mt-6">
        <h2 class="text-xl text-primary-orange mb-2">
          Assigned Guards
          <span class="text-xs text-white text-opacity-40">
            {{ assignedUsers?.length }} Guards
          </span>
        </h2>
        <div class="grid grid-cols-4 xl:grid-cols-8 gap-2">
          <ZoneEventUserCardComponent
            :zoneId="zone.zoneId"
            @updateUser="updateUser"
            v-for="g in assignedUsers"
            :guard="g"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ZoneEventRecordingDeviceCardComponent from '@/components/microphones/ZoneEventRecordingDeviceCardComponent.vue';
import ZoneEventUserCardComponent from '@/components/microphones/ZoneEventUserCardComponent.vue';
import axios from 'axios';
import TheNavigation from '@/components/shared/TheNavigation.vue';

export default {
  components: {
    ZoneEventUserCardComponent,
    ZoneEventRecordingDeviceCardComponent,
    TheNavigation,
  },
  props: ['id'],
  name: 'GroupDetails',
  setup(props) {
    const Id = props.id;
    return { Id };
  },
  methods: {
    async updateDevice(device) {
      const index = this.zone.event?.eventRecordingDevices.indexOf(device);
     this.zone.event?.eventRecordingDevices[index] == device;
      // this.zone.event?.eventRecordingDevices.push(device);
    },
    updateUser(user) {
      const index = this.zone.event?.eventUsers.indexOf(user);
      // this.zone.event?.eventUsers[index] == user;
      this.zone.event?.eventUsers.splice(index, 1);
      this.zone.event?.eventUsers.push(user);
    },
    getDetails() {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}zone/${this.id}`)
        .then((res) => (this.zone = res.data))
        .catch((err) => console.log('retrieve zone: ', err));
    },
  },
  data() {
    return { zone: {} };
  },
  async mounted() {
    await this.getDetails();
  },

  computed: {
    unassignedMics() {
      return this.zone.event?.eventRecordingDevices.filter(
        (device) => device.zoneId == null
      );
    },
    assignedMics() {
      return this.zone.event?.eventRecordingDevices.filter(
        (device) => device.zoneId != null
      );
    },
    unassignedUsers() {
      return this.zone.event?.eventUsers.filter(
        (device) => device.zoneId == null
      );
    },
    assignedUsers() {
      return this.zone.event?.eventUsers.filter(
        (device) => device.zoneId == this.Id
      );
    },
  },
};
</script>
