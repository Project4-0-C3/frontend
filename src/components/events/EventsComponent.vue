<template>
  <div class="col-span-3">
    <SearchBarComponent :whatToSearch="'Events'" @searched="onSearched" />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <CrudEventComponent :eventData="''" CreateOrUpdate="Create" :EventId="0" />
      <EventCardComponent
        v-for="e in filteredData.slice(0, 8)"
        :key="e.eventId"
        :event="e"
        class="col"
      />
    </div>
  </div>
</template>

<script>
import SearchBarComponent from '@/components/shared/SearchBarComponent.vue';
import EventCardComponent from '@/components/events/EventCardComponent.vue';
import CrudEventComponent from './CrudEventComponent.vue';
import { ref, watch } from 'vue';
import axios from 'axios';

export default {
  name: 'Events',
  components: { EventCardComponent, SearchBarComponent, CrudEventComponent },

  methods: {
    // GetEvents() {
    //   fetch(`${process.env.VUE_APP_BASE_URL}Event`)
    //     .then((res) => res.json())
    //     .then((data) => (this.events = data))
    //     .catch((err) => console.log('retrieve events: ', err));
    // },

    GetEvents() {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}Event`)
        .then((res) => (this.events = res.data))
        .catch((error) => {
          console.error('Retrieving events gave an error!', error);
        });
    },

    onSearched(event) {
      this.search = event;
    },
  },
  setup() {
    const search = ref('');

    return {
      search,
    };
  },
  data() {
    // console.log('data')
    return { events: [] };
  },

  mounted() {
    this.GetEvents();
    // console.log('mounted')
  },

  computed: {
    filteredData() {
      return this.events.filter((event) =>
        event.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
};
</script>
