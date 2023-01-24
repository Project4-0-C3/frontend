<template>
  <div class="w-full mb-3">
    <button @click="$router.go(-1)" class="hover:underline text-primary-orange">
      Go back
    </button>
  </div>
  <div class="grid">
    <h1 class="row text-4xl text-primary-orange">
      {{ event.name }}
    </h1>
    <h2 class="row text-xl mb-6 text-white text-opacity-40">
      {{ event.eventType?.name }}
    </h2>
    <div class="grid">
      <span class="col">{{ formatDate(event?.date) }}</span>
      <span class="col">{{ formatHour(event?.date) }}</span>
      <span class="col">{{ event.location }}</span>
      <p class="mt-4 col">{{ event.description }}</p>
    </div>

    <div class="col mt-4">
      <h2 class="text-xl text-primary-orange mb-2">
        People on the job
        <span class="text-xs text-white text-opacity-40">
          {{ event.eventUsers?.length }} Users
        </span>
      </h2>
      <div
        v-if="event.eventUsers"
        class="grid grid-cols-3 xl:grid-cols-5 gap-2"
      >
        <span
          class="col-span-3 xl:col-span-5 text-xs text-white text-opacity-40"
          >{{ TeamLeadsLength }} Teamleads</span
        >
        <UserModalComponent
          :AlrUsedUsers="AlreadyUsedTeamLeads"
          :EventId="event?.eventId"
          :Role="'TeamLead'"
          @reload-details="Reload"
        />
        <!-- <p>{{ allTeamLeads }}</p> -->
        <UserCardComponent v-for="e in allTeamLeads" :user="e.user" />
        <span
          class="col-span-3 xl:col-span-5 text-xs text-white text-opacity-40"
          >{{ GuardsLength }} Guards</span
        >
        <UserModalComponent
          :AlrUsedUsers="AlreadyUsedGuards"
          :EventId="event?.eventId"
          :Role="'Guard'"
          @reload-details="Reload"
        />
        <UserCardComponent v-for="e in allGuards" :user="e.user" />
      </div>
      <template v-if="event.eventUsers?.length <= 0">
        <div class="text-red-500">ADD PEOPLE SHOULD COME HERE IF NO USERS</div>
      </template>

      <div class="col my-4">
        <h2 class="text-xl text-primary-orange mb-2">
          Used Microphones
          <span class="text-xs text-white text-opacity-40">
            {{ event.eventRecordingDevices?.length }} Microphones
          </span>
        </h2>

        <div class="grid grid-cols-6 gap-2">
          <RecordingDeviceComponent
            v-for="e in event.eventRecordingDevices"
            :recordingDevice="e"
          />
        </div>
        <template v-if="event.eventRecordingDevices?.length <= 0">
          <div class="text-red-500">
            ADD RECORDINGDEVICES SHOULD COME HERE IF NO RECORDINGDEVICES
          </div>
        </template>
      </div>
      <div class="col-span-2">
        <h2 class="text-xl text-primary-orange mb-2">
          Groups
          <span class="text-xs text-white text-opacity-40">
            {{ event.groups?.length }} Groups
          </span>
        </h2>
        <div class="grid grid-cols-6 gap-2">
          <GroupCardComponent
            v-for="e in event.groups"
            :group="e"
            class="aspect-square"
          />
        </div>
        <template v-if="event.groups?.length <= 0">
          <div class="text-red-500">
            ADD GROUPS SHOULD COME HERE IF NO GROUPS
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import UserCardComponent from '@/components/users/UserCardComponent.vue';
import RecordingDeviceComponent from '@/components/microphones/EventRecordingDeviceCardComponent.vue';
import GroupCardComponent from '@/components/groups/GroupCardComponent.vue';
import UserModalComponent from '@/components/users/UserModalComponent.vue';
import { ref } from 'vue';

export default {
  components: {
    UserCardComponent,
    RecordingDeviceComponent,
    GroupCardComponent,
    UserModalComponent,
  },
  props: ['id'],
  name: 'EventDetails',
  methods: {
    getDetails() {
      fetch(`${process.env.VUE_APP_BASE_URL}Event/${this.id}`)
        .then((res) => res.json())
        .then((data) => (this.event = data))
        .catch((err) => console.log('retrieve event: ', err));
      // console.log('getDetails');
    },

    async Reload() {
      await this.getDetails();
      this.AlreadyUsedGuards;
      this.AlreadyUsedTeamLeads;
      // await this.allTeamLeads;
      // await this.allGuards;
      //  console.log('Reload pageData');
    },

    formatDate(dateString) {
      const date = dayjs(dateString);
      // Then specify how you want your dates to be formatted
      return date.format('DD/MM/YYYY');
    },
    formatHour(dateString) {
      const date = dayjs(dateString);
      // Then specify how you want your dates to be formatted
      return date.format('HH:mm');
    },
  },
  setup() {
    const checkedGuards = ref([]);
    const checkedTeamLeads = ref([]);

    return { checkedGuards, checkedTeamLeads };
    // console.log(process.env.VUE_APP_BASE_URL);
  },
  data() {
    // console.log('data')
    return { event: {} };
  },
  async mounted() {
    await this.getDetails();
    // console.log('mounted', this.event);
    // myFunc(this.event.eventUsers);
  },
  computed: {
    allTeamLeads() {
      return this.event.eventUsers.filter((eventuser) =>
        eventuser.user.role.toLowerCase().includes('teamlead')
      );
    },
    allGuards() {
      return this.event.eventUsers.filter((eventuser) =>
        eventuser.user.role.toLowerCase().includes('guard')
      );
    },
    GuardsLength() {
      return this.allGuards.length;
    },
    TeamLeadsLength() {
      return this.allTeamLeads.length;
    },

    AlreadyUsedTeamLeads() {
      this.checkedTeamLeads = [];
      this.allTeamLeads.forEach((u) => {
        this.checkedTeamLeads.push(u.user.userId);
      });
      return this.checkedTeamLeads;
    },
    AlreadyUsedGuards() {
      this.checkedGuards = [];
      this.allGuards.forEach((g) => {
        this.checkedGuards.push(g.user.userId);
      });
      return this.checkedGuards;
    },
  },
};
</script>
