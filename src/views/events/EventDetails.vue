<template v-if="event">
  <TheNavigation />
  <main class="container mx-auto py-6">
    <div class="w-full mb-3">
      <button
        @click="$router.go(-1)"
        class="hover:underline text-primary-orange"
      >
        Go back
      </button>
    </div>
    <div class="grid">
      <h1 class="col flex justify-between text-4xl text-primary-orange">
        <div class="grid grid-cols-1">
          <span class="col">{{ event.name }}</span>
          <span class="col text-xl text-white text-opacity-40">{{ event.eventType?.name }}</span>
        </div> 
        <!-- <StartStopComponent/> -->
        
      </h1>
      <!-- <h2 class="col text-xl mb-6 text-white text-opacity-40">
        {{ event.eventType?.name }}
      </h2> -->
      <div class="grid mt-6">
        <span class="col">{{ formatDate(event?.date) }}</span>
        <!-- <span class="col">{{ formatHour(event?.date) }}</span> -->
        <span class="col">{{ event.location }}</span>
        <p class="mt-4 col">{{ event.description }}</p>
      </div>
      <!-- <EventDetailsComponent :Event="event"/> -->
      <EventModalComponent
        class="mt-4"
        v-if="myUser.roleType.name == 'Admin'"
        :event="event"
        CreateOrUpdate="Update"
        :EventId="Id"
      />

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
            >{{ allTeamLeads.length }} Teamleads</span
          >
          <UserModalComponent
            v-if="myUser.roleType.name == 'Admin'"
            :AlrUsedUsers="AlreadyUsedTeamLeads"
            :EventId="Id"
            :Role="'TeamLead'"
            @reload-details="Reload"
          />
          <!-- <p>{{ allTeamLeads }}</p> -->
          <UserCardComponent
            v-for="e in allTeamLeads"
            :user="e.user"
            :key="e.user.userId"
          />
          <span
            class="col-span-3 xl:col-span-5 text-xs text-white text-opacity-40"
            >{{ allGuards.length }} Guards</span
          >
          <UserModalComponent
            v-if="
              myUser.roleType.name == 'Admin' ||
              myUser.roleType.name == 'Teamlead'
            "
            :AlrUsedUsers="AlreadyUsedGuards"
            :EventId="Id"
            :Role="'Guard'"
            @reload-details="Reload"
          />
          <UserCardComponent
            v-for="e in allGuards"
            :user="e.user"
            :key="e.user.userId"
          />
        </div>

        <div class="col my-4">
          <h2 class="text-xl text-primary-orange mb-2">
            Used Microphones
            <span class="text-xs text-white text-opacity-40">
              {{ event.eventRecordingDevices?.length }} Microphones
            </span>
          </h2>

          <div class="grid grid-cols-6 gap-2">
            <MicModalComponent
              v-if="
                myUser.roleType.name == 'Admin' ||
                myUser.roleType.name == 'Teamlead'
              "
              :AlrUsedMics="AlreadyUsedMics"
              :EventId="Id"
              @reload-details="Reload"
            />
            <RecordingDeviceComponent
              v-for="e in event.eventRecordingDevices"
              :recordingDevice="e"
            />
          </div>
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
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import dayjs from 'dayjs';
import UserCardComponent from '@/components/users/UserCardComponent.vue';
import RecordingDeviceComponent from '@/components/microphones/EventRecordingDeviceCardComponent.vue';
import GroupCardComponent from '@/components/groups/GroupCardComponent.vue';
import UserModalComponent from '@/components/users/UserModalComponent.vue';
import EventModalComponent from '@/components/events/EventModalComponent.vue';
import MicModalComponent from '@/components/microphones/MicModalComponent.vue';
import { ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import TheNavigation from '@/components/shared/TheNavigation.vue';
import { useRouter } from 'vue-router';
import StartStopComponent from '@/components/events/StartStopComponent.vue';

export default {
  components: {
    StartStopComponent,
    UserCardComponent,
    RecordingDeviceComponent,
    GroupCardComponent,
    UserModalComponent,
    EventModalComponent,
    MicModalComponent,
    TheNavigation,
  },
  props: ['id'],
  name: 'EventDetails',
  methods: {
    getDetails() {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}Event/${this.id}`)
        .then((res) => (this.event = res.data))
        .catch((err) => {
          console.log('retrieve event: ', err), this.router.push('/');
        });
    },
    formatDate(dateString) {
      const date = dayjs(dateString);
      return date.format('DD/MM/YYYY');
    },
    formatHour(dateString) {
      const date = dayjs(dateString);
      return date.format('HH:mm');
    },

    async Reload() {
      await this.getDetails();
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const checkedGuards = ref([]);
    const checkedMics = ref([]);
    const checkedTeamLeads = ref([]);
    const Id = props.id;

    return {
      checkedGuards,
      checkedTeamLeads,
      checkedMics,
      Id,
      myUser: store.state.myUser,
    };
  },
  data() {
    return { event: {} };
  },
  async mounted() {
    await this.getDetails();
  },
  computed: {
    allTeamLeads() {
      return this.event.eventUsers.filter(
        (eventuser) => eventuser.user.roleTypeId == 2
      );
    },
    allGuards() {
      return this.event.eventUsers.filter(
        (eventuser) => eventuser.user.roleTypeId == 3
      );
    },
    allMics() {
      return this.event.eventRecordingDevices;
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
    AlreadyUsedMics() {
      this.checkedMics = [];
      this.event.eventRecordingDevices?.forEach((mic) => {
        this.checkedMics.push(mic);
      });
      return this.checkedMics;
    },
  },
};
</script>
