<template>
  <div class="col">
    <SearchBarComponent :whatToSearch="'Teamleads'" @searched="onSearched" />
    <div class="grid grid-cols-1 gap-4 my-6">
      <TeamLeadCardComponent
        v-for="u in filteredData.slice(0,9)"
        :key="u.userId"
        :user="u"
        class="col"
      />
    </div>
  </div>
</template>

<script>
import SearchBarComponent from '@/components/shared/SearchBarComponent.vue';
import TeamLeadCardComponent from './TeamLeadCardComponent.vue';
import { ref, watch } from 'vue';

export default {
  name: 'Teamleads',
  components: {  SearchBarComponent, TeamLeadCardComponent },

  methods: {
    GetEvents() {
      fetch('https://localhost:7100/api/User')
        .then((res) => res.json())
        .then((data) => (this.users = data))
        .catch((err) => console.log('retrieve users failed: ', err));
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
    return { users: [] };
  },

  mounted() {
    this.GetEvents();
    // console.log('mounted')
  },

  computed: {
    filteredData() {

      return this.users.filter((user) =>
    //   {const fullName = user.firstName + ' ' + user.lastName},
        user.firstName.toLowerCase().includes(this.search.toLowerCase())
        || user.lastName.toLowerCase().includes(this.search.toLowerCase())
        // || user.email.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
};
</script>
