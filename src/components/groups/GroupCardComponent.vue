<template>
  <router-link
    :to="{ name: 'GroupDetails', params: { id: group.groupId } }"
    class="block p-4 rounded-lg shadow-lg bg-primary-gray hover:bg-primary-orange hover:bg-opacity-40 hover:duration-200 duration-200"
  >
    <h5 class="leading-tight text-primary-orange text-xl uppercase text-center">
      {{ group.name }}
      <!-- <span class="text-xs text-white text-opacity-40"> {{ group.zone }}</span> -->
    </h5>
    <!-- <p class="text-base">
      {{ group.email }}
    </p> -->
  </router-link>
</template>

<script setup>
defineProps({
  group: {
    groupId: Number,
    name: String
    // zone: { name: String, eventRecordingDevices: [] },
  },
});
</script>
