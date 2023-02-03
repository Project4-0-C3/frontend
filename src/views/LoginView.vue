<template>
  <TheNavigation class="absolute z-10 w-full bg-opacity-70" />
  <section class="min-h-screen flex items-stretch text-white">
    <div
      class="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover bg-center relative items-center"
      style="
        background-image: url(https://hiphop-n-more.com/wp-content/uploads/2022/11/video-lil-uzi-vert-just-wanna-rock.jpg);
      "
    >
      <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
      <div class="w-full px-24 z-10">
        <h1 class="text-5xl font-bold text-left tracking-wide">
          Keep it special
        </h1>
        <p class="text-3xl my-4">
          Monitor your memories in a safe way, anywhere.
        </p>
      </div>
    </div>
    <div
      class="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
      style="background-color: #161616"
    >
      <div
        class="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
        style="
          background-image: url(https://pbs.twimg.com/ext_tw_video_thumb/1593612084050202625/pu/img/2gKUEVE8TOKeax5U.jpg:large);
        "
      >
        <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
      </div>
      <div class="w-full py-6 z-20">
        <h1 class="my-6">
          <img src="@/assets/logo.png" alt="Logo" class="h-10 mx-auto" />
        </h1>
        <div action="" class="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
          <div class="pb-2 pt-4">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              class="block w-full p-4 text-lg rounded-sm bg-black"
              v-model="email"
            />
          </div>
          <div class="pb-2 pt-4">
            <input
              class="block w-full p-4 text-lg rounded-sm bg-black"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              v-model="password"
            />
          </div>
          <div class="text-right text-gray-400 hover:text-gray-100">
            <i v-if="error" class="text-red-400"
              >Your email and password are not correct</i
            >
          </div>
          <div class="px-4 pb-2 pt-4">
            <button
              @click="Login"
              class="uppercase block w-full p-4 text-lg rounded-full bg-primary-orange hover:bg-opacity-60 focus:outline-none"
            >
              sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import TheNavigation from '@/components/shared/TheNavigation.vue';

export default {
  components: { TheNavigation },
  setup() {
    const store = useStore();

    const updateMyUser = (user) => {
      store.dispatch('updateMyUser', user);
    };

    const router = useRouter();
    console.log(store.state.user);

    const email = ref('');
    const password = ref('');

    return {
      email,
      password,
      router,
      myUser: store.state.myUser,
      updateMyUser,
    };
  },

  data() {
    return {
      error: false,
    };
  },

  methods: {
    async Login() {
      await axios
        .get(
          `${process.env.VUE_APP_BASE_URL}User/${this.email},${this.password}`
        )
        .then((res) => {
          //   console.log(data)
          this.updateMyUser(res.data);
        })

        .catch((err) => ((this.error = true), console.log(err)));
      if (!this.error) {
        this.router.push('/');
      }
    },
  },
};
</script>
