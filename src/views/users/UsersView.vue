<template>
  <!-- <p v-for="user in users">{{ user.firstName }}</p> -->
  <div class="flex flex-col mx-10">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <div class="mb-3">
            <div class="grid grid-cols-5 gap-2 py-2">
              <SearchBarComponent
                :whatToSearch="'Users'"
                @searched="onSearched"
                class="col-span-3"
              />
              <RoleSearchBarCompponent
                @searchRole="onRoleSearched"
                class="col-span-1"
              />
              <button class="text-cente">
                <ManageUserModalComponent
                  :userData="{}"
                  CreateOrUpdate="Create"
                  :UserId="0"
                  @Reload="reload"
                />
              </button>
            </div>
            <p class="text-sm text-white text-opacity-40">
              {{ filteredUsers.length }} users found {{ roleTypeId }}
            </p>
          </div>
          <table class="w-full text-sm text-left">
            <thead class="text-xs uppercase bg-gray-50 bg-opacity-10">
              <tr>
                <th scope="col" class="px-6 py-3">First name</th>
                <th scope="col" class="px-6 py-3">Last name</th>
                <th scope="col" class="px-6 py-3">Email</th>
                <th scope="col" class="px-6 py-3">Role</th>
                <th scope="col" class="px-6 py-3">Phone</th>
                <th>Edit user</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="user in filteredUsers"
                class="border-b border-gray-700 hover:bg-primary-orange hover:bg-opacity-10 duration-200 hover:duration-200"
              >
                <td scope="row" class="px-6 py-4">
                  {{ user.firstName }}
                </td>
                <td scope="row" class="px-6 py-4">
                  {{ user.lastName }}
                </td>
                <td class="px-6 py-4">{{ user.email }}</td>
                <td class="px-6 py-4">
                  {{ user.roleType.name }}
                  <button
                    v-on:click="changeRole(user.userId, user)"
                    v-if="user.roleTypeId != 1"
                    class="mx-2 p-2 text-blue-100 bg-primary-gray rounded hover:bg-opacity-70"
                  >
                    Change role
                  </button>
                </td>
                <td class="px-6 py-4">
                  {{ user.phoneNumber ? user.phoneNumber : "Does not apply" }}
                </td>
                <td
                  class="text-green-500 hover:text-green-900 hover:duration-200 duration-200"
                ><div class="flex">
                  <ManageUserModalComponent
                    :userData="user"
                    CreateOrUpdate="Update"
                    :UserId="user.userId"
                    @Reload="reload"
                  />
                  <button
                    @click="handleDelete(user.userId)"
                    class="text-red-500 hover:text-red-900 hover:duration-200 duration-200 pr-8"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <div class="text-center mt-2">
            <button @click="backPage" class="mx-2 px-2 text-blue-100 bg-primary-orange rounded hover:bg-opacity-70">back</button>
            <button
              v-for="item in Math.ceil(data.length / perPage)"
              :key="item"
              @click="() => goToPage(item)"
              class="mx-2 px-2 text-primary-orange border border-primary-orange rounded hover:bg"
            >
              {{ item }}
            </button>
            <button @click="nextPage" class="mx-2 px-2 text-blue-100 bg-primary-orange rounded hover:bg-opacity-70">next</button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
  <!-- <div v-for="item in paginatedData" :key="item.index">{{ item.value }}</div> -->
</template>
<script>
import SearchBarComponent from "@/components/shared/SearchBarComponent.vue";
import RoleSearchBarCompponent from "@/components/shared/RoleSearchBarComponent.vue";
import ManageUserModalComponent from "@/components/users/ManageUserModalComponent.vue";
import axios from "axios";
import { ref } from "vue";
import handlePagination from "./HandlePaginationComponent";
export default {
  name: "AdminUsers",
  components: {
    SearchBarComponent,
    RoleSearchBarCompponent,
    ManageUserModalComponent,
  },

  methods: {
    handleDelete (id) {
      window.confirm("Are you sure you want to delete this user?");
      alert(`Confirm to delete this user`);
      axios.delete(`${process.env.VUE_APP_BASE_URL}user/${id}`);
      setTimeout(() => {
      this.reload();
      }, 500)
    },
    reload() {
      this.GetUsers();
    },
    GetUsers() {
      axios.get(process.env.VUE_APP_BASE_URL + "User").then((res) => {
        this.users = res.data;
      });
    },
    GetRoles() {
      axios.get(process.env.VUE_APP_BASE_URL + "RoleType").then((res) => {
        this.roles = res.data;
      });
    },
    changeRole(id, user) {
      let _user = { ...user };
      if (user.roleTypeId == 2) {
        _user = { ...user, roleTypeId: 3 };
        user.roleType.name = "Guard";
        user.roleTypeId = 3;
      } else {
        _user = { ...user, roleTypeId: 2 };
        user.roleType.name = "Teamlead";
        user.roleTypeId = 2;
      }
      axios.put(`${process.env.VUE_APP_BASE_URL}User/${id}`, _user);
    },

    onSearched(event) {
      this.search = event;
    },
    onRoleSearched(event) {
      this.roleSearch = event;
    },
  },
  setup() {
    const search = ref("");
    const roleSearch = ref("");
    // const handlePaginationValue = handlePagination(this.users);

    // return { ...handlePaginationValue, search };
    return { search, roleSearch };
  },
  data() {
    return { users: [], roles: [], selected: 0 };
  },

  mounted() {
    this.GetUsers();
    this.GetRoles();
  },

  computed: {
    filteredUsers() {
      return this.users.filter(
        (user) =>
          ((user.firstName + " " + user.lastName)
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
            user.email.toLowerCase().includes(this.search.toLowerCase())) &&
          (user.roleTypeId == this.roleSearch || this.roleSearch == 0)
      );
    },
  },
};
</script>
