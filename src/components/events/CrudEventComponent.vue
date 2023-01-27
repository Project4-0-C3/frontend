<template>
  <div class="container mx-auto">
    <div
      class="block rounded-lg shadow-lg bg-primary-gray bg-opacity-60 hover:bg-primary-orange hover:bg-opacity-40 hover:duration-200 duration-200 h-full w-full"
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
              :value="eventData.name"
              placeholder="Name"
            />

            <input
              required
              class="mb-4 shadow border sm:rounded-lg w-full py-2 px-3 text-primary-gray leading-tight"
              id="date"
              type="datetime-local"
              :value="eventData.date"
            />
            <EventTypeSelectComponent
              @selected-event-type="selectEvent"
              required
              :alrSelected="eventData?.eventTypeId"
            />
            <input
              required
              class="mb-4 shadow border sm:rounded-lg w-full py-2 px-3 text-primary-gray leading-tight"
              id="address"
              type="text"
              placeholder="Address"
              :value="eventData.location"
            />

            <!-- content here -->
          </div>

          <button
            @click="isOpen = false"
            class="px-6 py-2 text-primary-orange border border-primary-orange rounded hover:bg"
          >
            Cancel
          </button>

          <button
            @click="SaveChanges"
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

export default {
  components: { EventTypeSelectComponent },
  props: ['eventData', 'CreateOrUpdate', 'EventId'],
  setup(props) {
    const eventData = ref([
      props.eventData.name,
      props.eventData.date,
      props.eventData.eventTypeId,
      props.eventData.eventTypeId,
    ]);
    const Id = props.EventId;
    const CreateOrUpdate = props.CreateOrUpdate;

    return { eventData, CreateOrUpdate, Id };
  },

  data() {
    return { isOpen: true };
  },

  methods: {
    selectEvent(event) {
      console.log(event);
    },
  },
};
</script>
