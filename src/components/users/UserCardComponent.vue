<template>
  <router-link
    :to="{ name: 'UserDetails', params: { id: user.userId } }"
    class="block p-2 rounded-lg shadow-lg bg-primary-gray hover:bg-primary-orange hover:bg-opacity-40 hover:duration-200 duration-200"
  >
    <h5 class="leading-tight text-primary-orange">
      {{ user.firstName }} {{ user.lastName }}
      <span class="text-xs text-white text-opacity-40">
        {{ user.roleTypeId == 2 ? 'TeamLead' : 'Guard' }}</span
      >
    </h5>
    <p class="text-base">
      {{ user.email }}
    </p>
  </router-link>
</template>

<script>
export default {
  props: ['user'],
  setup(props) {
    const user = props?.user;

    return { user };
  },
};
</script>
