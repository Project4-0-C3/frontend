<template>
  <TheNavigation />
  <main class="container mx-auto py-6">
    <!-- {{ myUser.userId }} -->
  <div><h1 class="text-xl leading-tight text-primary-orange font-bold ">My active event</h1></div>


  <div class="col-span-3" v-if="myUser.roleType.name != 'Guest'">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 mb-12">
      <EventCardComponent
        v-for="e in activeEvents"
        :key="e.eventUserId"
        :event="e.event"
        class="col"
      />
    </div>
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
    activeEvents() {
      return this.user.eventUsers?.filter((eventuser) =>
      eventuser.event.startTime != null && eventuser.event.stopTime == null
      );
    },
  },
};
</script>
