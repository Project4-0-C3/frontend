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
      <span class="col">{{ formatDate(event.date) }}</span>
      <span class="col">{{ formatHour(event.date) }}</span>
      <span class="col">{{ event.location }}</span>
      <p class="mt-4 col">{{ event.description }}</p>
    </div>

    <div class="col mt-4">
      <h2 class="text-xl text-primary-orange mb-2">
        People on the job
        <span class="text-xs text-white text-opacity-40">
          {{event.eventUsers?.length}} Users 
        </span>
      </h2>
      <div
        v-if="event.eventUsers"
        class="grid grid-cols-3 xl:grid-cols-5 gap-2"
      >
        <GuardCardComponent v-for="e in event.eventUsers" :user="e.user" />
      </div>
      <template v-if="event.eventUsers?.length <= 0">
          <div class="text-red-500"> ADD PEOPLE SHOULD COME HERE IF NO USERS</div>
        </template>

      <div class="col my-4">
        <h2 class="text-xl text-primary-orange mb-2">Used Microphones <span class="text-xs text-white text-opacity-40">
          {{event.eventRecordingDevices?.length}} Microphones 
        </span></h2>
        
        <div class="grid grid-cols-6 gap-2">
          <RecordingDeviceComponent
            v-for="e in event.eventRecordingDevices"
            :recordingDevice="e"
          />
        </div>

        <template v-if="event.eventRecordingDevices?.length <= 0">
          <div class="text-red-500"> ADD RECORDINGDEVICES SHOULD COME HERE IF NO RECORDINGDEVICES</div>
        </template>
      </div>
      <div class="col-span-2">
        <h2 class="text-xl text-primary-orange mb-2">Groups <span class="text-xs text-white text-opacity-40">
          {{event.groups?.length}} Groups 
        </span></h2>
        <div class="grid grid-cols-6 gap-2">
          <GroupCardComponent
            v-for="e in event.groups"
            :group="e"
            class="aspect-square"
          />
        </div>
        <template v-if="event.groups?.length <= 0">
          <div class="text-red-500"> ADD GROUPS SHOULD COME HERE IF NO GROUPS</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import GuardCardComponent from '@/components/guards/GuardCardComponent.vue';
import RecordingDeviceComponent from '@/components/microphones/EventRecordingDeviceCardComponent.vue';
import GroupCardComponent from '@/components/groups/GroupCardComponent.vue';
export default {
  components: {
    GuardCardComponent,
    RecordingDeviceComponent,
    GroupCardComponent,
  },
  props: ['id'],
  name: 'EventDetails',
  methods: {
    getDetails() {
      fetch(`https://localhost:7100/api/Event/${this.id}`)
        .then((res) => res.json())
        .then((data) => (this.event = data))
        .catch((err) => console.log('retrieve event: ', err));
      // console.log('mounted')
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
    myFunc(a) {
      console.log(a.length);
    },
  },
  setup() {},
  data() {
    // console.log('data')
    return { event: {} };
  },
  async mounted() {
    await this.getDetails();
    // myFunc(this.event.eventUsers);
  },
};
</script>
