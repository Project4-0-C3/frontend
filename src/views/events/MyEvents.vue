<template>
    <TheNavigation />
    <main class="container mx-auto py-6">
      <div><SearchBarComponent :whatToSearch="'Events'" @searched="onSearched" /></div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <EventCardComponent
      v-for="e in filteredData"
        :key="e.event.eventId"
        :event="e.event"
        class="col"
      />
  </div></main>
  </template>
  
  <script>
  import TheNavigation from '@/components/shared/TheNavigation.vue';
  import EventCardComponent from '@/components/events/EventCardComponent.vue';
  import SearchBarComponent from '@/components/shared/SearchBarComponent.vue';
  import { useStore } from 'vuex';
  import axios from 'axios';
  import { ref } from 'vue';
  export default {
    name: 'MyEvents',
    components: { TheNavigation, EventCardComponent, SearchBarComponent },

    methods: {
      GetUser() {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}User/${this.myUser?.userId}`)
        .then((res) => (this.user = res.data, this.eventUsers = res.data.eventUsers))
        .catch((error) => {
          console.error('Retrieving user gave an error!', error);
        });
    },
    onSearched(event) {
      this.search = event;
    },
    },
    data() {
    return { user: {}, eventUsers: [] };
  },
  mounted() {
    this.GetUser();
  },

    setup(){
      const search = ref('');
      const store = useStore();
        return {myUser: store.state.myUser, search}
    },
    computed: {
    filteredData() {
      return this.eventUsers.filter((eventUser) =>
        eventUser.event.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  };
  </script>
  