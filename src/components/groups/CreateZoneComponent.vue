<template>
  <div
    class="rounded-lg shadow-lg bg-primary-gray bg-opacity-60 hover:bg-primary-orange hover:bg-opacity-40 hover:duration-200 duration-200 h-full"
  >
    <button
      @click="isOpen = true"
      class="leading-tight text-primary-orange w-full aspect-square p-2 rounded-lg"
      type="button"
    >
      Add zone
    </button>

    <div
      v-show="isOpen"
      class="absolute inset-0 flex items-center justify-center bg-primary-gray bg-opacity-50"
    >
      <div class="max-w-2xl p-6 bg-primary-gray rounded-md shadow-xl">
        <div class="flex items-center justify-between">
          <h3 class="text-2xl">Add zone</h3>

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
            v-model="zoneName"
            placeholder="Name"
          />
        </div>

        <button
          @click="isOpen = false"
          class="px-6 py-2 text-primary-orange border border-primary-orange rounded hover:bg"
        >
          Cancel
        </button>
       
        <button
          @click="CreateZone(zoneName)"
          class="px-6 py-2 ml-2 text-blue-100 bg-primary-orange rounded hover:bg-opacity-70"
        >
          Add Zone
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
export default {
  props: ['EventId'],
  setup(props) {
    const Id = props.EventId;
    const zoneName = ref('');

    return { Id, zoneName };
  },

  data() {
    return {
      isOpen: false,
    };
  },
  emits:['newZone'],

  methods: {
    CreateZone(Name) {
      const requestOptions = {
        headers: { 'Content-Type': 'application/json' },
        body: {
          zoneId: 0,
          eventId: this.Id,
          name: Name,
        },
      };
      axios
        .post(
          `${process.env.VUE_APP_BASE_URL}Zone`,

          requestOptions.body
        )
        .then((response) => {
          this.$emit('newZone', response.data);
          this.isOpen= false
        })
        .catch((err) => console.log(`Failed Creating of Zone`, err));
    },
  },
};
</script>
