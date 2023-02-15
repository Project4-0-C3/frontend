<template>
  <select
    v-model="selected"
    @change="onTypeChange"
    id="roles"
    class="mb-4 shadow border sm:rounded-lg w-full py-2 px-3 text-primary-gray leading-tight"
  >
    <option value="" disabled>Choose type of event</option>
    <option v-for="eventType in eventTypes" :value="eventType.eventTypeId">
      {{ eventType.name }}
    </option>
  </select>
</template>

<script>
import { ref, emit } from 'vue';
import axios from 'axios';

export default {
  props: ['alrSelected'],
  methods: {
    GetEventTypes() {
      axios.get(`${process.env.VUE_APP_BASE_URL}EventType`).then((res) => {
        this.eventTypes = res.data;
      });
    },
    onTypeChange(event) {
      this.$emit('selectedEventType', this.selected);
    },
  },
  data() {
    return { eventTypes: [] };
  },
  mounted() {
    this.GetEventTypes();
  },
  setup(props) {
    const selected = ref(props.alrSelected ? props.alrSelected : '');
    console.log(props?.alrSelected)
    return { selected };
  },
  emits: ['selectedEventType'],
};
</script>
