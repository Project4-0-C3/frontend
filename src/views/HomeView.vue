<template>
  <TheNavigation />
  <main class="container mx-auto py-6">
  <div v-if="myUser?.firstName && myUser?.lastName">Name: {{ myUser?.firstName }} {{ myUser?.lastName }}</div>
  <div v-if="myUser?.email">Email: {{ myUser?.email }}</div>
  <div v-if="myUser?.phoneNumber">Phone: {{ myUser?.phoneNumber }}</div>
  <div class="text-red-500 font-bold">Role: {{ myUser.roleType.name }}</div>
</main></template>

<script>
import { useStore } from 'vuex';
import TheNavigation from '@/components/shared/TheNavigation.vue';

export default {
  components: {TheNavigation},
  setup() {
    const store = useStore();
    // console.log( store.state.user)
    const role ='jonny'

    const updateMyUser = (user) => {
      store.dispatch('updateMyUser', user);
    };

    return {
      myUser: store.state.myUser,
      updateMyUser,
    };
  },
};
</script>
