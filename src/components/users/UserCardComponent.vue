<template>
  <div
    class="block p-2 rounded-lg shadow-lg bg-primary-gray "
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
  </div>
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
