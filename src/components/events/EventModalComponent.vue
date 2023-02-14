<template>
  <div class="container mx-auto">
    <div
      class="w-52 rounded-lg shadow-lg bg-primary-gray bg-opacity-60 hover:bg-primary-orange hover:bg-opacity-40 hover:duration-200 duration-200 h-full"
    >
      <button
        v-if="CreateOrUpdate == 'Create'"
        @click="isOpen = true"
        class="text-xl leading-tight text-primary-orange font-bold h-full w-full p-2"
        type="button"
      >
        {{ CreateOrUpdate }} Event
      </button>
      <button
        v-if="CreateOrUpdate != 'Create'"
        @click="isOpen = true"
        class="leading-tight text-primary-orange h-full w-full p-2 rounded-lg"
        type="button"
      >
        {{ CreateOrUpdate }} Event
      </button>

      <div
        v-show="isOpen"
        class="absolute inset-0 flex items-center justify-center bg-primary-gray bg-opacity-50"
      >
        <div class="max-w-2xl p-6 bg-primary-gray rounded-md shadow-xl">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl">{{ CreateOrUpdate }} Event</h3>

            <svg
              @click="isOpen = false"
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 text-primary-orange hover:text-primary-orange hover:text-opacity-70 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <div class="relative overflow-x-auto sm:rounded-lg my-5">
            <!-- content here -->

            <input
              required
              class="mb-4 shadow border sm:rounded-lg w-full py-2 px-3 text-primary-gray leading-tight"
              id="name"
              type="text"
              v-model="eventData.name"
              placeholder="Name"
            />

            <input
              required
              class="mb-4 shadow border sm:rounded-lg w-full py-2 px-3 text-primary-gray leading-tight"
              id="date"
              type="datetime-local"
              v-model="eventData.date"
            />
            <EventTypeSelectComponent
              @selected-event-type="selectEvent"
              required
              :alrSelected="eventData.eventTypeId"
            />
            <input
              required
              class="mb-4 shadow border sm:rounded-lg w-full py-2 px-3 text-primary-gray leading-tight"
              id="address"
              type="text"
              placeholder="Address"
              v-model="eventData.location"
            />

            <input
              required
              class="mb-4 shadow border sm:rounded-lg w-full py-2 px-3 text-primary-gray leading-tight"
              id="description"
              type="text"
              v-model="eventData.description"
              placeholder="Description"
            />
          </div>

          <button
            @click="isOpen = false"
            class="px-6 py-2 text-primary-orange border border-primary-orange rounded hover:bg"
          >
            Cancel
          </button>

          <button
            @click="SaveChanges(eventData)"
            class="px-6 py-2 ml-2 text-blue-100 bg-primary-orange rounded hover:bg-opacity-70"
          >
            {{ CreateOrUpdate }} Event
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import EventTypeSelectComponent from '../shared/EventTypeSelectComponent.vue';
import axios from 'axios';
export default {
  components: { EventTypeSelectComponent },
  props: ['event', 'CreateOrUpdate', 'EventId'],
  setup(props) {
    const Id = props.EventId;
    const CreateOrUpdate = props.CreateOrUpdate;
    const eventInfo = props.event;

    return { eventInfo, CreateOrUpdate, Id };
  },

  data() {
    return {
      isOpen: false,
      eventData: {
        eventId: this.eventInfo ? this.eventInfo.eventId : 0,
        name: this.eventInfo ? this.eventInfo.name : '',
        date: this.eventInfo
          ? this.eventInfo.date
          : new Date().toISOString().substr(0, 10),
        location: this.eventInfo ? this.eventInfo.location : '',
        eventTypeId: this.eventInfo ? this.eventInfo.eventTypeId : 0,
        description: this.eventInfo ? this.eventInfo.description : '',
      },
    };
  },

  methods: {
    selectEvent(newData) {
      this.eventData.eventTypeId = newData;
      console.log(this.eventData);
    },

    SaveChanges(eventInformation) {
      if (eventInformation.eventId != 0) {
        this.UpdateEvent(eventInformation);
      } else {
        this.CreateEvent(eventInformation);
      }
    },

    CreateEvent(eventInformation) {
      const requestOptions = {
        headers: { 'Content-Type': 'application/json' },
        body: {
          eventId: 0,
          name: eventInformation.name,
          date: eventInformation.date,
          location: eventInformation.location,
          eventTypeId: eventInformation.eventTypeId,
          description: eventInformation.description,
        },
      };
      axios
        .post(
          `${process.env.VUE_APP_BASE_URL}Event`,

          requestOptions.body
        )
        .catch((err) => console.log(`Failed Creating of Event`, err));
    },
    UpdateEvent(eventInformation) {
      const requestOptions = {
        headers: { 'Content-Type': 'application/json' },
        body: {
          eventId: eventInformation.eventId,
          name: eventInformation.name,
          date: eventInformation.date,
          location: eventInformation.location,
          eventTypeId: eventInformation.eventTypeId,
          description: eventInformation.description,
        },
      };
      axios
        .put(
          `${process.env.VUE_APP_BASE_URL}Event/${this.eventData.eventId}`,
          requestOptions.body
        )
        .catch((err) => console.log(`Failed Updating of Event`, err));
    },
  },
};
</script>
