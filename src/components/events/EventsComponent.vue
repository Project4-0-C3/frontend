<template>
  <div class="col-span-3">
    <SearchBarComponent :whatToSearch="'Events'" @searched="onSearched" />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <CrudEventComponent v-if="myUser.roleType.name == 'Admin'"
        :event="{}"
        CreateOrUpdate="Create"
        :EventId="0"
      />
      <EventCardComponent
        v-for="e in filteredData"
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
import CrudEventComponent from './EventModalComponent.vue';
import { ref, watch } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

export default {
  name: 'Events',
  components: { EventCardComponent, SearchBarComponent, CrudEventComponent },

  methods: {
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
    const store = useStore();

    return {
      search,
      myUser: store.state.myUser,
    };
  },
  data() {
    return { events: [] };
  },

  mounted() {
    this.GetEvents();
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
