<template>
  <div class="container mx-auto">
    <div @click="isOpen= true" v-if="CreateOrUpdate == 'Create'"><button class="px-6 py-2 text-primary-orange border border-primary-orange rounded hover:bg">Add microphone</button></div>
    <svg @click="isOpen= true" v-if="CreateOrUpdate == 'Update'"
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
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
    <div
      v-show="isOpen"
      class="absolute inset-0 flex items-center justify-center bg-primary-gray bg-opacity-50"
    >
      <div class="max-w-2xl p-6 bg-primary-gray rounded-md shadow-xl">
        <div class="flex items-center justify-between">
          <h3 class="text-2xl text-gray-50">{{ CreateOrUpdate }} Microphone</h3>

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
            id="Name"
            type="text"
            v-model="formName"
            placeholder="Name"
           
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
          @click="SaveChanges(Id)"
          class="px-6 py-2 ml-2 text-blue-100 bg-primary-orange rounded hover:bg-opacity-70"
        >
          {{ CreateOrUpdate }} Microphone
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { init } from "events";
import { ref } from "vue";

export default {
  components: {  },
  props: ["recordingDeviceData", "CreateOrUpdate", "RecordingDeviceId"],
  setup(props) {
    const recordingDeviceData = ref([
      props.recordingDeviceData?.name,
    ]);
    const Id = props.RecordingDeviceId;
// const selected = ref(props?.roleTypeId ? props?.roleTypeId: '');
    const CreateOrUpdate = props?.CreateOrUpdate;
    const formName = props?.recordingDeviceData.name;
    return { recordingDeviceData, CreateOrUpdate, Id, formName};
  },

  data(props) {
    return { isOpen: false, recordingDevice: []};
  },

  methods: {
    reload() {
      this.$emit('reload')
    },
    selectEvent(event) {
      console.log(event);
    },
    SaveChanges(id){
      var data = {
        recordingDeviceId: id,
        Name: this.formName,
      }
      if (id != 0){
        axios.put(`${process.env.VUE_APP_BASE_URL}recordingDevice/${id}`, data).then(this.$emit('newRecordingDeviceData', data));
      }
      else {
        axios.post(`${process.env.VUE_APP_BASE_URL}recordingDevice`, data).then(this.$emit('newRecordingDeviceData', data));
      }
      
      setTimeout(() => {
        this.reload();
        this.isOpen = false;
      }, 1000)
    }
  },
};
</script>
