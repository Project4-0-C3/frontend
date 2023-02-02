<template>
  <div class="container mx-auto">
    <div @click="isOpen= true" v-if="CreateOrUpdate == 'Create'"><button class="px-6 py-2 text-primary-orange border border-primary-orange rounded hover:bg">Add user</button></div>
    <svg @click="isOpen= true" v-if="CreateOrUpdate == 'Update'"
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
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
    <div
      v-show="isOpen"
      class="absolute inset-0 flex items-center justify-center bg-primary-gray bg-opacity-50"
    >
      <div class="max-w-2xl p-6 bg-primary-gray rounded-md shadow-xl">
        <div class="flex items-center justify-between">
          <h3 class="text-2xl text-gray-50">{{ CreateOrUpdate }} User</h3>

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

        <div class="relative overflow-x-auto sm:rounded-lg my-5">
          <!-- content here -->

          <input
            required
            class="mb-4 shadow border sm:rounded-lg w-full py-2 px-3 text-primary-gray leading-tight"
            id="firstName"
            type="text"
            v-model="formFirstName"
            placeholder="First name"
           
          />
          {{ props?.userData.firstName }}
          <input
            required
            class="mb-4 shadow border sm:rounded-lg w-full py-2 px-3 text-primary-gray leading-tight"
            id="lastName"
            type="text"
            v-model="formLastName"
            placeholder="Last name"
          />

          <input
            required
            class="mb-4 shadow border sm:rounded-lg w-full py-2 px-3 text-primary-gray leading-tight"
            id="email"
            type="text"
            v-model="formEmail"
            placeholder="Email"
          />
          <select v-model="formTypeId" id="roles"
          class="mb-4 shadow border sm:rounded-lg w-full py-2 px-3 text-primary-gray leading-tight">
          <option value="" disabled>Filter on role</option>
            <option :value=1>Admin</option>
            <option :value="2">Teamlead</option>
            <option :value="3">Guard</option>
          </select>
          
          <input
            required
            class="mb-4 shadow border sm:rounded-lg w-full py-2 px-3 text-primary-gray leading-tight"
            id="phoneNumber"
            type="text"
            v-model="formPhone"
            placeholder="Phonenumber"
          />

          <!-- content here -->
        </div>

        <button
          @click="isOpen = false"
          class="px-6 py-2 text-primary-orange border border-primary-orange rounded hover:bg"
        >
          Cancel
        </button>

        <button
          @click="SaveChanges(Id)"
          class="px-6 py-2 ml-2 text-blue-100 bg-primary-orange rounded hover:bg-opacity-70"
        >
          {{ CreateOrUpdate }} User
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { init } from "events";
import { ref } from "vue";

export default {
  components: {  },
  props: ["userData", "CreateOrUpdate", "UserId"],
  setup(props) {
    const userData = ref([
      props.userData?.firstName,
      props.userData?.lastName,
      props.userData?.email,
      props.userData?.roleTypeId,
      props.userData?.phoneNumber,
      props.userData?.password
    ]);
    const Id = props.UserId;
const selected = ref(props?.roleTypeId ? props?.roleTypeId: '');
    const CreateOrUpdate = props?.CreateOrUpdate;
    const formFirstName = props?.userData.firstName;
    const formLastName = props?.userData.lastName;
    const formEmail = props?.userData.email;
    const formTypeId = props?.userData.roleTypeId;
    const formPhone = props?.userData.phoneNumber;
    const formPassword = props?.userData.password;

    return { userData, CreateOrUpdate, Id, formFirstName, formEmail, formLastName, formPhone, formTypeId, formPassword};
  },

  data(props) {
    return { isOpen: false, user: []};
  },

  methods: {
    reload() {
      this.$emit('reload')
    },
    selectEvent(event) {
      console.log(event);
    },
    SaveChanges(id){
      if (this.formPassword == null){
        this.formPassword = 'User'
      }
      
      var data = {
        userId: id,
        firstName: this.formFirstName,
        lastName: this.formLastName,
        email: this.formEmail,
        roleTypeId: this.formTypeId,
        phoneNumber: this.formPhone,
        
        password: this.formPassword
      }
      if (id != 0){
        axios.put(`${process.env.VUE_APP_BASE_URL}user/${id}`, data).then(this.$emit('newUserData', data));
      }
      else {
        axios.post(`${process.env.VUE_APP_BASE_URL}user`, data).then(this.$emit('newUserData', data));
      }
      
      setTimeout(() => {
        this.reload();
        this.isOpen = false;
      }, 1000)
    }
  },
};
</script>
