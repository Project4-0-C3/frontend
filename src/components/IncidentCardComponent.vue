<template>
  <div
    class="rounded-lg shadow-lg py-2 bg-primary-gray text-center h-full w-full flex items-center justify-center"
  >
    <div>
      <h5
        :class="
          incident.moodTypeId == 3
            ? 'text-green-500'
            : incident.moodTypeId == 1
            ? 'text-red-500'
            : 'text-white'
        "
        class="leading-tight text-xl"
      >
        {{ incident.eventRecordingDevice?.placementName }}
        <!-- <span class="text-xs text-white text-opacity-40"> {{ incident.zone }}</span> -->
      </h5>
      <p class="text-base text-gray-300">
        {{ incident.incidentType?.name }} - {{ incident.moodType?.name }}
      </p>
      <p class="text-base text-gray-300">
        {{ moment(incident.startTime).utc('+1').format('LTS') }} till {{ moment(incident.endTime).utc('+1').format('LTS') }}
      </p>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment';

defineProps({
  incident: {},
});
</script>
