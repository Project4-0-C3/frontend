<template>
<select v-model="selected" @change="onRoleChange" id="moodTypes" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option selected value="0">All moodTypes</option>
  <option v-for="mType in moodTypes" :value="mType.moodTypeId">{{mType.name}}</option>
</select>
</template>

<script>
import { ref, emit } from "vue";
import axios from 'axios';

export default {
    methods:{
        GetRoles() {
      axios.get(`${process.env.VUE_APP_BASE_URL}MoodType`).then((res) => {
        this.moodTypes = res.data;
      });
    },
    onRoleChange(event) {
      this.$emit('searchMood', this.selected);
    },
    },
    data() {
    return { moodTypes: [] };
  },
  mounted() {
    this.GetRoles();
  },
  setup(props) {
    const selected = ref(0);
    return { selected, props};
  },
  emits: ['selected', 'searchMood'],
};
</script>
