<template>
  <router-link
    :to="{ name: 'MicDetails', params: { id: mic.eventRecordingDeviceId } }"
    class="block p-2 rounded-lg shadow-lg bg-primary-gray "
  >
    <h5 class="leading-tight text-primary-orange">
      {{ mic.recordingDevice?.name }} <span class="text-xs text-white text-opacity-40">
        {{ mic.placementName ? mic.placementName : '' }}</span
      >
    </h5>
    <p class="text-sm">
      {{ mic.zone?.name ? mic.zone?.name : 'No place yet' }}
    </p>
  </router-link>
</template>

<script>
export default {
  props: ['recordingDevice'],
  setup(props) {
    const mic = props.recordingDevice;

    return { mic }
  },
};
</script>
