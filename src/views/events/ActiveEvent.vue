<template>
  <TheNavigation />
  <div class="p-8 flex">
    <div class="border border-white flex-initial w-9/12 mx-2"><DashBoardComponent :shown="0" /></div>
    <div class="border border-white flex-initial w-3/12 mx-2">Meldingen</div>
  </div>
</template>
<script>
import TheNavigation from "@/components/shared/TheNavigation.vue";
import DashBoardComponent from "@/components/DashBoardComponent.vue";
export default {
  components: {
    TheNavigation,
    DashBoardComponent,
  },
};
</script>
