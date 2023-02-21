<template>
  <button @click="isOpen = true"
    class="block p-2 rounded-lg shadow-lg bg-primary-gray hover:bg-primary-orange hover:bg-opacity-40 hover:duration-200 duration-200"
  >
    <h5 class="leading-tight text-primary-orange">
      {{ user.user?.firstName }} {{ user.user?.lastName }}
      <span class="text-xs text-white text-opacity-40">
        {{ user.user?.roleTypeId == 2 ? 'TeamLead' : 'Guard' }}</span
      >
    </h5>
    <p class="text-base truncate">
      {{ user.user?.email }}
    </p>
  
  </button>

  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-primary-gray bg-opacity-50"
  >
    <div class="max-w-2xl p-6 bg-primary-gray rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl"> {{ user.user?.firstName }} {{ user.user?.lastName }}</h3>

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

      <div class="justify-between flex mt-4">
        <button
          @click="isOpen = false"
          class="px-6 py-2 text-primary-orange border border-primary-orange rounded hover:bg"
        >
          Cancel
        </button>

        <button
          @click="saveChanges"
          class="px-6 py-3 ml-2 bg-primary-orange rounded hover:bg-opacity-70"
        >
          {{ user.zoneId == null ? 'Add to zone' : 'Remove from zone' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, emit } from 'vue';

export default {
  props: ['guard', 'add', 'zoneId'],
  setup(props) {
    const user = props?.guard;
    const isOpen = ref(false);
    const add = ref(props?.add);
    const ZoneId = props.zoneId;

    return { user, isOpen, add, ZoneId };
  },
  emits: ['updateDevice', "updateUser"],

  methods: {
    AddRemoveZone() {},
    saveChanges() {
      const requestOptions = {
        headers: { 'Content-Type': 'application/json' },
        body: {
          ...this.user,
          zoneId : this.user.zoneId == null ? this.ZoneId : null
        },
      };
      axios
        .put(
          `${process.env.VUE_APP_BASE_URL}EventUser/${this.user.eventUserId}`,
          requestOptions.body
        )
        .then(
          (response) => (
            console.log(response),
            (this.isOpen = false),
            this.$emit('updateUser', requestOptions.body)
          )
        )
        .catch((err) =>
          console.log(`Failed Updating of EventUser: `, err)
        );
    },
  },
};
</script>
