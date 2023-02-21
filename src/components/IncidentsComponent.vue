<template>
  <IncidentSearchBarComponent @searchMood="onMoodSearched" class="py-2" />
  <div
    class="mt-4 grid grid-cols-1 gap-2 overflow-scroll overflow-x-hidden max-h-[45rem] pr-4"
  >
    <span
      v-if="filteredIncidents.length == 0"
      class="font-bold text-primary-orange"
      >No incidents</span
    >
    <IncidentCardComponent
      v-for="i in filteredIncidents.reverse()"
      :incident="i"
    />
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import IncidentCardComponent from './IncidentCardComponent.vue';
import IncidentSearchBarComponent from './shared/IncidentSearchBarComponent.vue';

export default {
  components: { IncidentCardComponent, IncidentSearchBarComponent },
  setup() {
    const moodSearch = ref(0);
    return { moodSearch };
  },
  data() {
    return { incidents: [], polling: null };
  },
  methods: {
    async GetIncidents() {
      // console.log(`${process.env.VUE_APP_BASE_URL}Incident`)
      this.polling = setInterval(() => {
        axios
          .get(`${process.env.VUE_APP_BASE_URL}Incident?event=1`)
          .then((res) => {
            this.incidents = res.data;
          })
          .catch((err) => console.log(`Failed Getting incidents: `, err));
      }, 3000);
    },

    onMoodSearched(event) {
      this.moodSearch = event;
    },
  },
  mounted() {
    this.GetIncidents();
  },

  computed: {
    filteredIncidents() {
      if (this.moodSearch != 0) {
        return this.incidents.filter(
          (incident) => incident.moodTypeId == this.moodSearch
        );
      } else {
        return this.incidents;
      }
    },
  },
};
</script>
