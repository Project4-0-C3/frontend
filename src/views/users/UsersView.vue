<template>
    <!-- <p v-for="user in users">{{ user.firstName }}</p> -->
    <div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full">
          <thead class="border-t">
            <tr class="border-t border-orange-500">
              <th scope="col" class="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                First name
              </th>
              <th scope="col" class="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                Last name
              </th>
              <th scope="col" class="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                Email
              </th>
              <th scope="col" class="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-t border-orange-500">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">1</td>
              <td class="text-sm text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                Mark
              </td>
              <td class="text-sm text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                Otto
              </td>
              <td class="text-sm text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                @mdo
              </td>
            </tr>
            <tr class="bg-gray-800 border-t border-orange-500">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">2</td>
              <td class="text-sm text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                Jacob
              </td>
              <td class="text-sm text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                Thornton
              </td>
              <td class="text-sm text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                @fat
              </td>
            </tr>
            <tr class="bg-gray-800 border-t border-orange-500">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">3</td>
              <td class="text-sm text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                Larry
              </td>
              <td class="text-sm text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                Wild
              </td>
              <td class="text-sm text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                @twitter
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import SearchBarComponent from '@/components/shared/SearchBarComponent.vue';
import axios from 'axios';
import { ref } from 'vue';
    export default {
  name: 'AdminUsers',
  components: { SearchBarComponent},

  methods: {
    GetUsers() {
      axios.get(process.env.VUE_APP_BASE_URL+'User')
      .then(res => {
        this.users = res.data});
    },

    onSearched(event) {
      this.search = event;
    },
  },
  setup() {
    const search = ref('');

    return {
      search,
    };
  },
  data() {
    // console.log('data')
    return { users: [] };
  },

  mounted() {
    this.GetUsers();
    // console.log('mounted')
  }
};


</script>