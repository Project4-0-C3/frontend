<template>
  <button
    @click="isOpen = true"
    class="rounded-lg shadow-lg bg-primary-gray hover:bg-primary-orange hover:bg-opacity-40 hover:duration-200 duration-200 text-center h-full w-full flex items-center justify-center"
  >
    <div>
      <h5 class="leading-tight text-primary-orange text-xl uppercase">
        {{ zone.name }}
        <!-- <span class="text-xs text-white text-opacity-40"> {{ zone.zone }}</span> -->
      </h5>
      <p class="text-base text-white text-opacity-40">
        {{ zone.eventUsers.length }}
        {{ zone.eventUsers.length != 1 ? 'Guards' : 'Guard' }}
      </p>
      <p class="text-base text-white text-opacity-40">
        {{ zone.eventRecordingDevices.length }}
        {{
          zone.eventRecordingDevices.length != 1 ? 'Microphones' : 'Microphone'
        }}
      </p>
    </div>
  </button>

  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-primary-gray bg-opacity-50"
  >
    <div class="max-w-2xl p-6 bg-primary-gray rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">Zone</h3>

        <svg
          @click="isOpen = false"
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 h-8 text-primary-orange hover:text-primary-orange hover:text-opacity-70 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <p class="my-4">
        {{
          zone.eventRecordingDevices.length == 0 && zone.eventUsers.length == 0
            ? 'U can delete this'
            : "U can't delete this"
        }}
        <button
          v-if="
            zone.eventRecordingDevices.length == 0 &&
            zone.eventUsers.length == 0
          "
          @click="deleteZone"
          class="px-6 py-3 ml-2 bg-red-600 rounded hover:bg-opacity-70"
        >
          Delete Zone
        </button>
      </p>
      <div class="justify-between flex">
        <button
          @click="isOpen = false"
          class="px-6 py-2 text-primary-orange border border-primary-orange rounded hover:bg"
        >
          Cancel
        </button>

        <router-link
          :to="{ name: 'ZoneDetails', params: { id: zone.zoneId } }"
          class="px-6 py-3 ml-2 bg-primary-orange rounded hover:bg-opacity-70"
        >
          Zone details
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';

defineProps({
  isOpen: false,
  zone: {
    zoneId: Number,
    name: String,
    // zone: { name: String, eventRecordingDevices: [] },
  },
});
</script>

<script>
export default {
  emits: ['removeZone'],
  methods: {
    deleteZone() {
      axios
        .delete(`${process.env.VUE_APP_BASE_URL}Zone/${this.zone.zoneId}`)
        .then(this.$emit('removeZone', this.zone));
    },
  },
};
</script>
