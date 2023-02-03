<template>
  <div class="container mx-auto">
    <div
      class="block rounded-lg shadow-lg bg-primary-gray bg-opacity-60 hover:bg-primary-orange hover:bg-opacity-40 hover:duration-200 duration-200 h-full w-full"
    >
      <button
        @click="isOpen = true"
        class="leading-tight text-primary-orange h-full w-full p-2 rounded-lg"
        type="button"
      >
        Manage Mics
      </button>

      <div
        v-show="isOpen"
        class="absolute inset-0 flex items-center justify-center bg-primary-gray bg-opacity-50"
      >
        <div class="max-w-2xl p-6 bg-primary-gray rounded-md shadow-xl">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl">Manage Mics</h3>

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
          <SearchBarComponent
            class="my-4"
            whatToSearch="RecordingDevices"
            @searched="onSearched"
          />

          <div
            class="relative overflow-x-auto filteredMicsshadow-md sm:rounded-lg mb-5"
          >
            <table class="w-full text-sm text-left">
              <thead class="text-xs uppercase bg-gray-50 bg-opacity-10">
                <tr>
                  <th scope="col" class="p-4">
                    <div class="flex items-center">
                      <input
                        :checked="filteredMics.length == checkedMics.length"
                        @change="SelectAll()"
                        id="checkbox-all-search"
                        type="checkbox"
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-primary-orange focus:ring-1"
                      />
                      <label for="checkbox-all-search" class="sr-only"
                        >checkbox</label
                      >
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3">Name</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="mic in filteredMics"
                  class="border-b border-gray-700 hover:bg-primary-orange hover:bg-opacity-10 duration-200 hover:duration-200"
                >
                  <td class="w-4 p-4" :key="mic.recordingDeviceId">
                    <div class="flex items-center">
                      <input
                        :id="mic.eventRecordingDeviceId"
                        :value="mic.eventRecordingDeviceId"
                        type="checkbox"
                        v-model="checkedMics"
                        :disabled="
                          incidentRecordings.includes(mic.eventRecordingDeviceId)
                        "
                        :title="incidentRecordings.includes(mic.eventRecordingDeviceId) ? 'There are eventRecordings with this microphone' : ''"
                        class="w-4 h-4"
                      />
                      <label for="checkbox-table-search-1" class="sr-only"
                        >checkbox</label
                      >
                    </div>
                  </td>
                  <td
                    scope="row"
                    class="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {{ mic.recordingDevice.name }}
                  </td>
                </tr>
              </tbody>
            </table>
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
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<script>
import { ref, emit } from 'vue';
import SearchBarComponent from '../shared/SearchBarComponent.vue';
import axios from 'axios';

export default {
  components: { SearchBarComponent },
  props: ['AlrUsedMics', 'EventId'],
  setup(props) {
    // const checkedMics = ref(props?.AlrUsedMics);
    const EventId = props.EventId;

    const search = ref('');

    return { EventId, search };
  },

  data() {
    return {
      isOpen: false,
      recordingDevices: [],
      existingMicNumbers: [],
      checkedMics: [],
      incidentRecordings: [],
    };
  },
  methods: {
    onSearched(event) {
      this.search = event;
    },
    SelectAll() {
      if (
        this.checkedMics.length == this.filteredMics.length &&
        this.checkedMics.length == this.recordingDevices.length
      ) {
        this.checkedMics = [];
      } else {
        this.filteredMics.forEach((mic) => {
          if (!this.checkedMics.includes(mic.recordingDeviceId)) {
            this.checkedMics.push(mic.recordingDeviceId);
          }
        });
      }
    },
    GetIncidentRecordingDevices() {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}Incident?event=${this.EventId}`)
        .then((res) => {
          res.data.forEach((data) => {
            if (
              this.incidentRecordings.indexOf(
                data.eventRecordingDevice.recordingDeviceId
              ) == -1
            ) {
              this.incidentRecordings.push(
                data.eventRecordingDevice.recordingDeviceId
              );
            }
          });
        })
        .catch((error) => {
          console.error(
            'Retrieving recordingDevices does not exist gave an error!',
            error
          );
        });
    },
    GetRecordingDevices() {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}EventRecordingDevice?event=${this.EventId}`)
        .then((res) => this.recordingDevices = res.data)
        .catch((error) => {
          console.error('Retrieving recordingDevices gave an error!', error);
        });
    },
    async GetExistingRecordingDevices() {
      await axios
        .get(
          `${process.env.VUE_APP_BASE_URL}EventRecordingDevice?event=${this.EventId}`
        )
        .then((res) => {
          res.data.forEach((mic) => {
            this.existingMicNumbers.push(mic.recordingDeviceId);
            this.checkedMics.push(mic.recordingDeviceId);
          });
        })
        .catch((error) => {
          console.error(
            'Retrieving existing recordingDevices gave an error!',
            error
          );
        });
    },

    async SaveChanges() {
      this.existingMicNumbers.forEach((m) => {
        if (!this.checkedMics.includes(m)) {
          // DeleteRequest
          axios
            .delete(
              `${process.env.VUE_APP_BASE_URL}EventRecordingDevice/${m}?eventId=${this.EventId}`
            )
            .then(() => console.log('Delete successful'))
            .catch((err) =>
              console.log(`Failed Deleting of EventRecordingDevice ${m}: `, err)
            );
        }
      });
      this.checkedMics.forEach((m) => {
        if (!this.existingMicNumbers.includes(m)) {
          // PostRequest
          const requestOptions = {
            headers: { 'Content-Type': 'application/json' },
            body: {
              eventRecordingDeviceId: 0,
              eventId: this.EventId,
              recordingDeviceId: m,
            },
          };
          axios
            .post(
              `${process.env.VUE_APP_BASE_URL}EventRecordingDevice`,
              requestOptions.body
            )
            .catch((err) =>
              console.log(`Failed Posting of EventRecordingDevice ${m}: `, err)
            );
        }
      });

      await (this.existingMicNumbers = this.checkedMics);
      setTimeout(() => {
        this.$emit('reload-details');

        setTimeout(() => {
          this.isOpen = false;
        }, 500);
      }, 2000);
    },
  },

  async mounted() {
    await this.GetRecordingDevices();
    // await this.GetExistingRecordingDevices();
    // await this.GetIncidentRecordingDevices();
  },

  computed: {
    filteredMics() {
      return this.recordingDevices.filter((mic) =>
        mic.recordingDevice.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
};
</script>
