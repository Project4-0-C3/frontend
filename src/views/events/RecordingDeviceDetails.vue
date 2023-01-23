<template>
    <div class="w-full mb-3">
      <button @click="$router.go(-1)" class="hover:underline text-primary-orange">Go back</button>
    </div>
    <div class="grid">
      <h1 class="col md:col-span-2 text-4xl text-primary-orange">
        {{ recordingDevice.name }} <span class="text-sm text-white text-opacity-40">{{ recordingDevice.role }}</span>
      </h1>
      <div class="col grid mt-2">
      <!-- <span class="text-lg">{{ recordingDevice.placementName }}</span> -->
      
    </div>
    </div>
  </template>
  
  <script>
  import dayjs from 'dayjs';
  
  export default {
    props: ['id'],
    name: 'RecordingDeviceDetails',
    methods: {
      getDetails() {
        fetch(`https://localhost:7100/api/RecordingDevice/${this.id}`)
          .then((res) => res.json())
          .then((data) => (this.recordingDevice = data))
          .catch((err) => console.log('retrieve recordingDevice: ', err));
        // console.log('mounted')
      },
    },
    data() {
      // console.log('data')
      return { recordingDevice: {} };
    },
    async mounted() {
      await this.getDetails();
    },
  };
  </script>
  