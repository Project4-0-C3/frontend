<template>
  <div class="bg-black bg-opacity-40">
    <nav
      class="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center"
    >
      <div class="flex items-center justify-between">
        <router-link to="/" class="text-xl font-bold text-gray-100 md:text-2xl">
          <img src="@/assets/logo.png" alt="logo" class="h-10" />
        </router-link>
        <!-- Mobile menu button -->
        <div @click="toggleNav" class="flex md:hidden">
          <button
            type="button"
            class="text-primary-orange hover:text-opacity-60 focus:outline-none focus:text-primary-orange"
          >
            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
              <path
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <ul
        :class="showMenu ? 'flex' : 'hidden'"
        class="text-center flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
      >
        <router-link
          to="/"
          class="font-bold text-gray-100 hover:text-primary-orange"
        >
          Home
        </router-link>

        <router-link
          v-if="myUser.roleType.name == 'Admin'"
          to="/events"
          class="font-bold text-gray-100 hover:text-primary-orange"
        >
          Events
        </router-link>
        <router-link
          v-if="myUser.roleType.name == 'Guard' || myUser.roleType.name == 'Teamlead'"
          to="/myEvents"
          class="font-bold text-gray-100 hover:text-primary-orange"
        >
          Events
        </router-link>
        <router-link
          v-if="
            myUser.roleType.name == 'Admin' ||
            myUser.roleType.name == 'Teamlead'
          "
          to="/admin/users"
          class="font-bold text-gray-100 hover:text-primary-orange"
        >
          Users
        </router-link>

        <!-- <router-link
          to="/shouldRedirectToApi"
          class="font-bold text-gray-100 hover:text-primary-orange"
        >
          Redirect
        </router-link> -->
        <router-link
          to="/about"
          class="font-bold text-gray-100 hover:text-primary-orange"
          >About
        </router-link>
        <router-link
          v-if="myUser.roleType.name == 'Guest'"
          to="/login"
          class="font-bold text-gray-100 hover:text-primary-orange"
          >Login
        </router-link>
        <a
          v-if="myUser.roleType.name != 'Guest'"
          class="font-bold text-gray-100 hover:text-primary-orange cursor-pointer"
          @click="Logout()"
        >
          Logout
        </a>
      </ul>
    </nav>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const page = ref('');

    const Logout = () => {
      store.dispatch('updateMyUser', { roleType: { name: 'Guest' } });
      router.push('/login');
    };

    let showMenu = ref(false);
    const toggleNav = () => (showMenu.value = !showMenu.value);
    return { showMenu, toggleNav, myUser: store.state.myUser, Logout, page };
  },

  watch: {
    $route() {
      this.page = this.$route.path;
      console.log(this.page);
    },
  },
};
</script>
