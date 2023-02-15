<template>
    <div
      class="rounded-lg shadow-lg bg-primary-gray hover:bg-primary-orange hover:bg-opacity-40 hover:duration-200 duration-200 text-center h-full w-full flex items-center justify-center"
    >
      <div>
        <h5 class="leading-tight text-primary-orange text-xl uppercase">
          {{ group?.name }}
          <!-- <span class="text-xs text-white text-opacity-40"> {{ group.zone }}</span> -->
        </h5>
        <p class="text-base">
          {{ group.zone?.name }}
        </p>
        <p class="text-base text-white text-opacity-40">
          {{ group.eventUsers.length }}
          {{ group.eventUsers.length != 1 ? 'Guards' : 'Guard' }}
        </p>
        <p class="text-base text-white text-opacity-40">
          {{ group.zone?.eventRecordingDevices.length }}
          {{
            group.zone?.eventRecordingDevices.length != 1
              ? 'Microphones'
              : 'Microphone'
          }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    group: {
      groupId: Number,
      name: String,
      // zone: { name: String, eventRecordingDevices: [] },
    },
  });
  </script>
  