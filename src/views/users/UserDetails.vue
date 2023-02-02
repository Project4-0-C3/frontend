<template>
  <TheNavigation />
  <main class="container mx-auto py-6">
  <div class="w-full mb-3">
    <button @click="$router.go(-1)" class="hover:underline text-primary-orange">Go back</button>
  </div>
  <div class="grid">
    <h1 class="col md:col-span-2 text-4xl text-primary-orange">
      {{ user.firstName }} {{ user.lastName }} <span class="text-sm text-white text-opacity-40">{{ user.role }}</span>
    </h1>
    <div class="col grid mt-2">
    <span class="text-lg">{{ user.email }}</span>
    
  </div>
  </div></main>
</template>

<script>
import dayjs from 'dayjs';
import TheNavigation from '@/components/shared/TheNavigation.vue';

export default {
  components: {TheNavigation},
  props: ['id'],
  name: 'UserDetails',
  methods: {
    getDetails() {
      fetch(`https://localhost:7100/api/User/${this.id}`)
        .then((res) => res.json())
        .then((data) => (this.user = data))
        .catch((err) => console.log('retrieve user: ', err));
      // console.log('mounted')
    },
  },
  data() {
    // console.log('data')
    return { user: {} };
  },
  async mounted() {
    await this.getDetails();
  },
};
</script>
