<template>
  <div
    :class="
      !event.startDate
        ? 'bg-green-900 hover:bg-green-500'
        : 'bg-red-900 hover:bg-red-500'
    "
    class="h-full text-white aspect-square text-xl rounded-lg shadow-lg hover:bg-opacity-20 hover:duration-200 duration-200 text-center flex justify-center"
  >
    {{ !event.startDate ? 'Start' : 'Stop' }}
  </div>
</template>
<script setup></script>
<script>
export default {
  methods: {
    startStop() {
        // TO-DO: dfsdfd
    },
  },
};
</script>
