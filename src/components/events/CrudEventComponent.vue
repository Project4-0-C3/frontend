<template>
  <p>Message is: {{ eventa.name }}</p>
  <input
  class="text-4xl text-primary-orange"
  v-model="eventa.name"
  placeholder="edit me"
  />
  <p>Message is: {{ eventa.date }}</p>
  <input
  type="datetime-local"
  class="text-4xl text-primary-orange"
  v-model="eventa.date"
  placeholder="edit me"
  />
</template>

  <script>
  import { ref } from 'vue';
  
  export default {
    props: ['crudDetails'],
    setup(props) {
      // const event = {
      //     eventId: Number == props.crudDetails?.eventId ? props.crudDetails?.eventId : 0,
      //     eventTypeId: Number == props.crudDetails?.eventTypeId ? props.crudDetails?.eventTypeId : 0,
      //     name: String == props.crudDetails?.name ? props.crudDetails?.name : '',
      //     date: Date = props.crudDetails?.date ? props.crudDetails?.date : Date.now(),
      //     location: String == props.crudDetails?.location ? props.crudDetails?.location : '',
      //     description: String == props.crudDetails?.description ? props.crudDetails?.description : ''
      // };
  
      const eventa = ref(props?.crudDetails)
      return { eventa };
    },
  };
  </script>
