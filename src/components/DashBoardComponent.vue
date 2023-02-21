<template>
  <div class="p-8">
    <div>
      <div class="flex justify-between py-6 px-8 mx-8">
        <button class="text-center" @click="reload()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="white"
            class="w-12 h-12 bg-primary-orange rounded-full p-2 hover:shadow-gray-700 hover:shadow-inner duration-200 hover:duration-200 hover:rotate-180"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
        <div class="text-center">
          <button
            class="border border-white rounded-l-md px-2 bg-gray-900 hover:bg-gray-600"
            @click="previous()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="w-8 h-8 p-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
          </button>
          <button
            class="border border-white rounded-r-md px-2 bg-gray-900 hover:bg-gray-600"
            @click="next()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="w-8 h-8 p-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <iframe
      :src="`http://grafana.westeurope.cloudapp.azure.com:3000/d-solo/iTCZz50Vz/testing?orgId=1&${all_dashboards[current_shown]}`"
      frameborder="0"
      class="mx-auto rounded-md shadow-slate-700 shadow-md block h-auto min-h-[30rem] w-full"
    ></iframe>
  </div>
</template>
<script>
export default {
  methods: {
    previous() {
        if(this.current_shown == 0){
            this.current_shown = this.all_dashboards.length-1
        }
        else{
            this.current_shown -= 1;
        }
        this.$forceUpdate();
    },
    next(){
        if(this.current_shown == this.all_dashboards.length-1){
            this.current_shown = 0;
        }
        else{
            this.current_shown +=1
        }
        this.$forceUpdate();
    },
    reload(){
      this.current_shown = this.current_shown + 1 - 1
        this.$forceUpdate();
    }
  },
  props: ["shown"],
  setup(props) {
    const current_shown = props?.shown;
    const all_dashboards = [
      "var-mood_filter=2&from=1676896985338&to=1676898464083&var-Event_filter=3&panelId=10",
      "from=1676896985338&to=1676898464083&var-Event_filter=3&panelId=2",
      "from=1676875741074&to=1676897341074&panelId=6",
      "from=1676875778367&to=1676897378367&panelId=8",
      "from=1676875893018&to=1676897493018&panelId=4"
    ];
    return { all_dashboards, current_shown };
  },
};
</script>
