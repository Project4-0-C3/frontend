<template>

  <div class="flex gap-2">
  <button v-if="event.startTime != null" @click="$router.push({path: `/activeevent/${eventId}`})" class="p-4 h-full text-white  text-xl rounded-lg shadow-lg hover:bg-opacity-80 hover:duration-200 duration-200 text-center flex justify-center bg-primary-orange"
>{{ event.stopTime == null ? 'Live event statistics': 'Event log' }}</button>
  <button v-if="event.stopTime == null"
    @click="startStop()"
    :class="
      event.startTime == null

        ? 'bg-green-900 hover:bg-green-500'
        : 'bg-red-900 hover:bg-red-500'
    "
    class="h-full text-white p-4 text-xl rounded-lg shadow-lg hover:bg-opacity-20 hover:duration-200 duration-200 text-center flex justify-center"
  >
    {{ event.startTime == null ? "Start" : "Stop" }}
  </button>
</div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  props: ['event', 'eventId'],
  setup(props){
    // const event = ref([
    //   props.event?.name,
    //   props.event?.date,
    //   props.event?.location,
    //   props.event?.description,
    //   props.event?.eventTypeId,
    //   props.event?.startTime,
    //   props.event?.stopTime,
    // ]);
    const thisId = props?.eventId;
    const router = useRouter();
    const thisEvent = props?.event;
    console.log(thisEvent);
    console.log("eventid", thisId);
    return {thisEvent, router, thisId}
  },
  mounted() {
    this.getDetails();
  },
  methods: {

    getDetails() {
      axios
        .get(`${process.env.VUE_APP_BASE_URL}Event/${this.thisId}`)
        .then((res) => (this.thisEvent = res.data))
        .catch((err) => {
          console.log('retrieve event: ', err), this.router.push('/');
        });
    },
    AddStartTime(datestring) {
      // PostRequest
      const requestOptions = {
        headers: { "Content-Type": "application/json" },
        body: {
          eventId: this.thisEvent.eventId,
          date: this.thisEvent.date,
          name: this.thisEvent.name,
          location: this.thisEvent.location,
          eventTypeId: this.thisEvent.eventTypeId,
          description: this.thisEvent.description,
          stopTime: null,
          startTime: datestring,
        },
      };
      console.log(requestOptions.body);
      axios
        .put(
          `${process.env.VUE_APP_BASE_URL}Event/${this.thisId}`,
          requestOptions.body
        )
        .catch((err) => console.log("Failed Posting of StartEvent: ", err));
    },
    AddStopTime(datestring) {
      // PostRequest
      const requestOptions = {
        headers: { "Content-Type": "application/json" },
        body: {
          eventId: this.thisEvent.eventId,
          date: this.thisEvent.date,
          name: this.thisEvent.name,
          location: this.thisEvent.location,
          eventTypeId: this.thisEvent.eventTypeId,
          description: this.thisEvent.description,
          stopTime: datestring,
          startTime: this.thisEvent.startTime,
        },
      };
      console.log(requestOptions.body);
      axios
        .put(
          `${process.env.VUE_APP_BASE_URL}Event/${this.thisId}`,
          requestOptions.body
        )
        .catch((err) => console.log("Failed Posting of StartEvent: ", err));
    },
    async startStop() {
      if (this.thisEvent.startTime == null) {
        const startMoment = moment(Date.now()).utc("+1").format();
        await this.AddStartTime(startMoment);
        this.router.push(`/activeevent/${this.thisId}`);
      }
      else{
        const stopMoment = moment(Date.now()).utc("+1").format();
        await this.AddStopTime(stopMoment);

      }
    },
  },
};
</script>
