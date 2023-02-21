<template>
  <TheNavigation />
  <main class="container mx-auto py-6">
  <!-- <p v-for="user in users">{{ user.firstName }}</p> -->
  <div class="flex flex-col mx-10">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <div class="mb-3">
            <div class="grid grid-cols-5 gap-2 py-2">
              <SearchBarComponent
                :whatToSearch="'Microphones'"
                @searched="onSearched"
                class="col-span-3"
              />
              <button class="text-cente">
                <ManageMicrophoneComponent
                  :recordingDeviceData="{}"
                  CreateOrUpdate="Create"
                  :RecordingDeviceId="0"
                  @Reload="reload"
                />
              </button>
            </div>
            <p class="text-sm text-white text-opacity-40">
              {{ filteredMicrophones.length }} microphones found
            </p>
          </div>
          <table class="w-full text-sm text-left">
            <thead class="text-xs uppercase bg-gray-50 bg-opacity-10">
              <tr>
                <th scope="col" class="px-6 py-3">Name</th>
                <th>Edit microphone</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="microphone in filteredMicrophones"
                class="border-b border-gray-700 hover:bg-primary-orange hover:bg-opacity-10 duration-200 hover:duration-200"
              >
                <td scope="row" class="px-6 py-4">
                  {{ microphone.name }}
                </td>
                <td
                  class="text-green-500 hover:text-green-900 hover:duration-200 duration-200"
                ><div class="flex">
                  <ManageMicrophoneComponent
                    :recordingDeviceData="microphone"
                    CreateOrUpdate="Update"
                    :RecordingDeviceId="microphone.recordingDeviceId"
                    @Reload="reload"
                  />
                  <button
                    @click="handleDelete(microphone.recordingDeviceId)"
                    class="text-red-500 hover:text-red-900 hover:duration-200 duration-200 pr-8"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <div class="text-center mt-2">
            <button @click="backPage" class="mx-2 px-2 text-blue-100 bg-primary-orange rounded hover:bg-opacity-70">back</button>
            <button
              v-for="item in Math.ceil(data.length / perPage)"
              :key="item"
              @click="() => goToPage(item)"
              class="mx-2 px-2 text-primary-orange border border-primary-orange rounded hover:bg"
            >
              {{ item }}
            </button>
            <button @click="nextPage" class="mx-2 px-2 text-blue-100 bg-primary-orange rounded hover:bg-opacity-70">next</button>
          </div> -->
          </div>
        </div>
      </div>
    </div>
  </main>
  <!-- <div v-for="item in paginatedData" :key="item.index">{{ item.value }}</div> -->
</template>
<script>
import SearchBarComponent from "@/components/shared/SearchBarComponent.vue";
import ManageMicrophoneComponent from "./ManageMicrophoneComponent.vue";
import TheNavigation from '@/components/shared/TheNavigation.vue';
import axios from "axios";
import { ref } from "vue";
export default {
  name: "AdminRecordingDevices",
  components: {
    SearchBarComponent,
    TheNavigation,
    ManageMicrophoneComponent
},

  methods: {
    handleDelete (id) {
      window.confirm("Are you sure you want to delete this microphone?");
      alert(`Confirm to delete this microphone`);
      axios.delete(`${process.env.VUE_APP_BASE_URL}recordingDevice/${id}`);
      setTimeout(() => {
      this.reload();
      }, 500)
    },
    reload() {
      this.GetRecordingDevices();
    },
    GetRecordingDevices() {
      axios.get(process.env.VUE_APP_BASE_URL + 'RecordingDevice').then((res) => {
        this.recordingDevices = res.data;
      });
    },

    onSearched(event) {
      this.search = event;
    },
  },
  setup() {
    const search = ref('');

    return { search };
  },
  data() {
    return { recordingDevices: []};
  },

  mounted() {
    this.GetRecordingDevices();
  },

  computed: {
    filteredMicrophones() {
      return this.recordingDevices.filter(
        (recordingDevice) =>
          ((recordingDevice.name)
            .toLowerCase()
            .includes(this.search.toLowerCase()))
      );
    },
  },
};
</script>
