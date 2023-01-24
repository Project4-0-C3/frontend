<template>
  <div class="container mx-auto">
    <div
      class="block rounded-lg shadow-lg bg-primary-gray bg-opacity-60 hover:bg-primary-orange hover:bg-opacity-40 hover:duration-200 duration-200 h-full w-full"
    >
      <button
        @click="isOpen = true && GetExistingUsers"
        class="leading-tight text-primary-orange h-full w-full p-2 rounded-lg"
        type="button"
      >
        Manage {{ Role }}s
      </button>

      <div
        v-show="isOpen"
        class="absolute inset-0 flex items-center justify-center bg-primary-gray bg-opacity-50"
      >
        <div class="max-w-2xl p-6 bg-primary-gray rounded-md shadow-xl">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl">Manage {{ Role }}s</h3>

            <svg
              @click="isOpen = false"
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 text-primary-orange hover:text-primary-orange hover:text-opacity-70 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <!--  -->
          <br />
          <h3 class="text-2xl">{{ checkedUsers }}</h3>
          <br />
          <h3 class="text-2xl">{{ existingUsers }}</h3>
          <br />
          <h3 class="text-2xl">{{ existingUserNumbers }}</h3>
          <!--  -->
          <SearchBarComponent
            class="my-4"
            :whatToSearch="Role + 's'"
            @searched="onSearched"
          />

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
            <table class="w-full text-sm text-left">
              <thead class="text-xs uppercase bg-gray-50 bg-opacity-10">
                <tr>
                  <th scope="col" class="p-4">
                    <div class="flex items-center">
                      <input
                        :checked="filteredUsers.length == checkedUsers.length"
                        @change="SelectAll()"
                        id="checkbox-all-search"
                        type="checkbox"
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-primary-orange focus:ring-1"
                      />
                      <label for="checkbox-all-search" class="sr-only"
                        >checkbox</label
                      >
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3">Name</th>
                  <th scope="col" class="px-6 py-3">Email</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="user in filteredUsers"
                  class="border-b border-gray-700 hover:bg-primary-orange hover:bg-opacity-10 duration-200 hover:duration-200"
                >
                  <td class="w-4 p-4">
                    <div class="flex items-center">
                      <input
                        :id="user.userId"
                        :value="user.userId"
                        type="checkbox"
                        v-model="checkedUsers"
                        class="w-4 h-4 focus:ring-primary-orange focus:ring-2"
                      />
                      <label for="checkbox-table-search-1" class="sr-only"
                        >checkbox</label
                      >
                    </div>
                  </td>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {{ user.firstName }} {{ user.lastName }}
                  </th>
                  <td class="px-6 py-4">{{ user.email }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            @click="isOpen = false"
            class="px-6 py-2 text-primary-orange border border-primary-orange rounded hover:bg"
          >
            Cancel
          </button>

          <button
            @click="SaveChanges"
            class="px-6 py-2 ml-2 text-blue-100 bg-primary-orange rounded hover:bg-opacity-70"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, emit } from 'vue';
import SearchBarComponent from '../shared/SearchBarComponent.vue';

export default {
  components: { SearchBarComponent },
  props: ['AlrUsedUsers', 'EventId', 'Role'],
  setup(props) {
    const checkedUsers = ref(props.AlrUsedUsers);
    const EventId = props.EventId;
    const Role = props.Role;
    const search = ref('');
    return { checkedUsers, EventId, Role, search };
  },

  data() {
    return {
      isOpen: false,
      users: [],
      existingUsers: [],
      existingUserNumbers: [],
    };
  },
  methods: {
    onSearched(event) {
      this.search = event;
    },
    SelectAll() {
      if (
        this.checkedUsers.length == this.filteredUsers.length &&
        this.checkedUsers.length == this.users.length
      ) {
        this.checkedUsers = [];
      } else {
        this.filteredUsers.forEach((u) => {
          if (!this.checkedUsers.includes(u.userId)) {
            this.checkedUsers.push(u.userId);
          }
        });
      }
    },
    GetUsers() {
      fetch(`https://localhost:7100/api/User?role=${this.Role}`)
        .then((res) => res.json())
        .then((data) => (this.users = data))
        .catch((err) => console.log('retrieve all teamleads: ', err));
    },
    async GetExistingUsers() {
      // console.log(this.EventId)
      await fetch(
        `https://localhost:7100/api/EventUser?event=${this.EventId}&role=${this.Role}`
      )
        .then((res) => res.json())

        .then((data) => {
          (this.existingUsers = data),
            data.forEach((user) => {
              this.existingUserNumbers.push(user.userId);
            });
        })
        .catch((err) => console.log('retrieve all users within event: ', err));
    },

    async SaveChanges() {
      this.existingUsers.forEach((e) => {
        if (!this.checkedUsers.includes(e.userId)) {
          // DeleteRequest
          fetch(`https://localhost:7100/api/EventUser/${e.eventUserId}`, {
            method: 'DELETE',
          })
            // .then(() => (element.innerHTML = 'Delete successful'))
            .catch((err) =>
              console.log(
                `Failed Deleting of EventUser ${e.eventUserId}: `,
                err
              )
            );
          // Cleanup List
          this.existingUsers.slice(this.existingUsers.indexOf(e), 1);
          // this.existingUserNumbers.slice(this.existingUsers.indexOf(e), 1);
        }
      });
      this.checkedUsers.forEach((c) => {
        if (!this.existingUserNumbers.includes(c)) {
          // PostRequest
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              eventUserId: 0,
              eventId: this.EventId,
              userId: c,
            }),
          };
          // console.log(requestOptions);
          fetch('https://localhost:7100/api/EventUser', requestOptions)
            .then((response) => response.json())
            .catch((err) =>
              console.log(`Failed Posting of EventUser ${c}: `, err)
            );
          // .then((data) => (this.postId = data.id));
        }
      });

      await (this.existingUserNumbers = this.checkedUsers);
      this.existingUsers.forEach((u) => {
        // console.log(u)
        if (!this.checkedUsers.includes(u.userId)) {
          console.log(this.existingUsers.indexOf(u))
          this.existingUsers.slice(this.existingUsers.indexOf(u), 1);
          // this.existingUsers.slice(this.existingUsers.indexOf(u), 1);
        }
      });

      setTimeout(() => {
        this.$emit('reload-details');
        setTimeout(() => {
          this.isOpen = false;
        }, 500);
      }, 500);
    },
  },

  async mounted() {
    await this.GetUsers();
    await this.GetExistingUsers();
  },

  computed: {
    filteredUsers() {
      return this.users.filter(
        (user) =>
          //   {const fullName = user.firstName + ' ' + user.lastName},
          user.firstName.toLowerCase().includes(this.search.toLowerCase()) ||
          user.lastName.toLowerCase().includes(this.search.toLowerCase())
        // || user.email.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
};
</script>

<!-- <script setup>
defineProps({
  users: [
    // user: {
    //   userId: Number,
    //   firstName: String,
    //   lastName: String,
    //   email: String,
    // },
  ],
});
</script> -->
