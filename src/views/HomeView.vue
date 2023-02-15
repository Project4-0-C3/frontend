<template>
  <TheNavigation />
  <main class="container mx-auto py-6">
    <!-- {{ myUser.userId }} -->
  <div v-if="myUser?.firstName && myUser?.lastName">Name: {{ myUser?.firstName }} {{ myUser?.lastName }}</div>
  <div v-if="myUser?.email">Email: {{ myUser?.email }}</div>
  <div v-if="myUser?.phoneNumber">Phone: {{ myUser?.phoneNumber }}</div>
  <div class="text-red-500 font-bold">Role: {{ myUser.roleType.name }}</div>


  <div class="col-span-3" v-if="myUser.roleType.name != 'Guest'">
    <SearchBarComponent :whatToSearch="'Active Events'" @searched="onSearched" />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 mb-12">
      <EventCardComponent
        v-for="e in activeEvents"
        :key="e.eventId"
        :event="e.event"
        class="col"
      />
    </div>
    <!-- <SearchBarComponent :whatToSearch="'Future Events'" @searched="onSearched" />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <EventCardComponent
        v-for="e in futureEvents"
        :key="e.eventId"
        :event="e"
        class="col"
      />
    </div> -->
  </div>
</main></template>

<script>
import SearchBarComponent from '@/components/shared/SearchBarComponent.vue';
import EventCardComponent from '@/components/events/EventCardComponent.vue';
import { useStore } from 'vuex';

import TheNavigation from '@/components/shared/TheNavigation.vue';
import { ref } from 'vue';
import axios from 'axios';

export default {
  components: {TheNavigation, SearchBarComponent, EventCardComponent},
  setup() {
    const store = useStore();
    // console.log( store.state.user)
    const search = ref('');

    const updateMyUser = (user) => {
      store.dispatch('updateMyUser', user);
    };

    return {
      myUser: store.state.myUser,
      updateMyUser,
      search
    };
  },

  methods: {
    GetUser() {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}User/${this.myUser.userId}`)
        .then((res) => (this.user = res.data))
        .catch((error) => {
          console.error('Retrieving events gave an error!', error);
        });
    },

    onSearched(event) {
      this.search = event;
    },
  },
  data() {
    return { user: {} };
  },

  mounted() {
    this.GetUser();
  },

  computed: {
    // futureEvents() {
    //   return this.events.filter((event) =>
    //   event.date >= new Date().toISOString(0,10) && event.name.toLowerCase().includes(this.search.toLowerCase())
    //   );
    // },
    activeEvents() {
      return this.user.eventUsers?.filter((eventuser) =>
      eventuser.event.date >= new Date().toISOString(0,10) && eventuser.event.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
};
</script>
