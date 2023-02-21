<template>
  <router-link
    :to="{ name: 'ZoneDetails', params: { id: zone.zoneId } }"
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
          zone.eventRecordingDevices.length != 1
            ? 'Microphones'
            : 'Microphone'
        }}
      </p>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  zone: {
    zoneId: Number,
    name: String,
    // zone: { name: String, eventRecordingDevices: [] },
  },
});
</script>
