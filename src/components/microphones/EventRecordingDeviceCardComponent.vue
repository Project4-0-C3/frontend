<template>
  <router-link
    :to="{ name: 'MicDetails', params: { id: recordingDevice.eventRecordingDeviceId } }"
    class="block p-2 rounded-lg shadow-lg bg-primary-gray hover:bg-primary-orange hover:bg-opacity-40 hover:duration-200 duration-200"
  >
    <h5 class="leading-tight text-black">
      {{ recordingDevice.placementName }}
    </h5>
  </router-link>
</template>

<script setup>
defineProps({
  recordingDevice: {
    eventRecordingDeviceId: Number,
    placementName: String,
  },
});
</script>
