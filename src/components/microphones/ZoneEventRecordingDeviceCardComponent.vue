<template>
  <button
    @click="isOpen = true"
    class="block p-2 rounded-lg shadow-lg bg-primary-gray hover:bg-primary-orange hover:bg-opacity-40 hover:duration-200 duration-200"
  >
    <h5 class="leading-tight text-primary-orange">
      {{ mic.recordingDevice?.name }}
      <span class="text-xs text-white text-opacity-40">
        {{ mic.placementName ? mic.placementName : '' }}</span
      >
    </h5>
  </button>

  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-primary-gray bg-opacity-50"
  >
    <div class="max-w-2xl p-6 bg-primary-gray rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">{{ mic.recordingDevice?.name }}</h3>

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

      <div class="my-4">
        <input
          type="text"
          name="placementName"
          id="placementName"
          placeholder="place"
          class="mb-4 shadow border sm:rounded-lg w-full py-2 px-3 text-primary-gray leading-tight"
          v-model="mic.placementName"
        />
        <div class="flex items-center">
          <input
            :checked="mic.recordingDevice?.zoneId != null"
            v-model="checkedmic"
            id="checkbox-all-search"
            type="checkbox"
            class="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-primary-orange focus:ring-1"
          />
          <label for="checkbox-all-search" class="ml-2">in zone</label>
        </div>
        
      </div>
      <div class="justify-between flex">
        <button
          @click="isOpen = false"
          class="px-6 py-2 text-primary-orange border border-primary-orange rounded hover:bg"
        >
          Cancel
        </button>

        <button
          @click="saveChanges"
          class="px-6 py-3 ml-2 bg-primary-orange rounded hover:bg-opacity-70"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, emit } from 'vue';

export default {
  props: ['recordingDevice', 'add', 'zoneId'],
  setup(props) {
    const mic = props?.recordingDevice;
    const isOpen = ref(false);
    const add = ref(props?.add);
    const ZoneId = props.zoneId;
    const checkedmic = ref(props.recordingDevice?.zoneId == null ? false : true)

    return { mic, isOpen, add, ZoneId, checkedmic };
  },
  emits: ['updateDevice'],

  methods: {
    AddRemoveZone() {},
    saveChanges() {
      const requestOptions = {
        headers: { 'Content-Type': 'application/json' },
        body: {
          eventRecordingDeviceId: this.mic.eventRecordingDeviceId,
          placementName: this.mic.placementName ? this.mic.placementName : null,
          zoneId: this.checkedmic ? this.ZoneId : null,
          eventId: this.mic.eventId,
          recordingDeviceId: this.mic.recordingDeviceId,
          recordingDevice: this.mic.recordingDevice,
        },
      };
      axios
        .put(
          `${process.env.VUE_APP_BASE_URL}EventRecordingDevice/${this.mic.eventRecordingDeviceId}`,
          requestOptions.body
        )
        .then(
          (response) => (
            console.log(response),
            (this.isOpen = false),
            this.$emit('updateDevice', requestOptions.body)
          )
        )
        .catch((err) =>
          console.log(`Failed Updating of EventRecordingDevice: `, err)
        );
    },
  },
};
</script>
