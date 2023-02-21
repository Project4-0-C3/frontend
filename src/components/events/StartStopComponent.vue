<template>
  <div
    @click="startStop()"
    :class="
      !event.startTime
        ? 'bg-green-900 hover:bg-green-500'
        : 'bg-red-900 hover:bg-red-500'
    "
    class="h-full text-white aspect-square text-xl rounded-lg shadow-lg hover:bg-opacity-20 hover:duration-200 duration-200 text-center flex justify-center"
  >
    {{ !event.startTime ? 'Start' : 'Stop' }} {{ event.startTime }}
  </div>
</template>
<script setup>
import axios from 'axios';

defineProps({
  event: {
    eventId: Number == null,
    startTime: Date == null,
    endTime: Date == null,
  },
});
</script>
<script>
export default {
  methods: {
    AddStartTime() {
      // PostRequest
      const requestOptions = {
        headers: { 'Content-Type': 'application/json' },
        body: {
          ...event,
          startTime: Date.now(),
        },
      };
      console.log(requestOptions.body)
      axios
        .put(
          `${process.env.VUE_APP_BASE_URL}Event/1`,
          requestOptions.body
        )
        .catch((err) => console.log(`Failed Posting of StartEvent: `, err));
    },
    startStop() {
      if (!event.startTime) {
        console.log('start is null',);
        moment().format('LL'); 
        this.AddStartTime()
      }
    },
  },
};
</script>
