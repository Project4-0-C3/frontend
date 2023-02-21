<template>
  <TheNavigation />
  <div class="container mx-auto py-6 grid grid-cols-1 md:grid-cols-4 gap-2">
    <div class="col-span-1 md:col-span-4 order-1 mb-3">
      <button
        @click="$router.go(-1)"
        class="hover:underline text-primary-orange"
      >
        Go back
      </button>
    </div>
    <div class="col-span-1 md:col-span-3 order-3 md:order-2" v-if="myUser.roleType.name != 'Guard'"><DashBoardComponent :shown="0" /></div>
    <div :class="myUser.roleType.name == 'Guard' ? 'md:col-span-4' : ''" class="col-span-1 order-2 md:order-3"><IncidentsComponent /></div>
  </div>
</template>
<script>
import TheNavigation from "@/components/shared/TheNavigation.vue";
import DashBoardComponent from "@/components/DashBoardComponent.vue"; 
import IncidentsComponent from "@/components/IncidentsComponent.vue"; 
import { useRouter } from 'vue-router';
import { useStore } from "vuex";

export default {
  components: {
    TheNavigation,
    DashBoardComponent,
    IncidentsComponent
  },

  setup() {
    const store = useStore();

    return {myUser: store.state.myUser}
  }
};
</script>
