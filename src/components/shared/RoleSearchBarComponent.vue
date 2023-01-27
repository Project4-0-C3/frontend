<template>
<select v-model="selected" @change="onRoleChange" id="roles" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled>Filter on role</option>
  <option :selected="true" value=0 >All roles</option>
  <option v-for="role in roles" :value="role.roleTypeId">{{role.name}}</option>
</select>
</template>

<script>
import { ref, emit } from "vue";
import axios from 'axios';

export default {
    methods:{
        GetRoles() {
      axios.get(`${process.env.VUE_APP_BASE_URL}RoleType`).then((res) => {
        this.roles = res.data;
      });
    },
    onRoleChange(event) {
      this.$emit('searchRole', this.selected);
    },
    },
    data() {
    return { roles: [] };
  },
  mounted() {
    this.GetRoles();
  },
  setup(props) {
    const selected = ref('');
    return { selected, props};
  },
  emits: ['selected'],
};
</script>
