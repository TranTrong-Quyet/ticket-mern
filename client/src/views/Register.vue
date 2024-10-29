<script setup>
import { ref, toRefs } from 'vue'
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast'

import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore()

const toast = useToast()

const registerFromData = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
})

const { name, email, password, confirmPassword } = toRefs(registerFromData.value)

const onFormSubmit = () => {
  const showError = () => {
    toast.add({ severity: 'error', summary: 'Password is not match', detail: 'Enter your correct confirm password', life: 3000 });
  };
  if (password.value !== confirmPassword.value) {
    console.log('pass word is not match')
    showError()
  } else {
    const userData = {
      name: name.value,
      email: email.value,
      password: password.value,
    }
    console.log('hi')
    authStore.register(userData)
  }
  console.log(name.value, email.value, password.value)
}



</script>

<template>
  <div class="">
    <Toast />
    <section class="py-20 flex flex-col item-center">
      <h2 class=" self-center text-3xl font-medium pb-10">Register, {{ authStore.initialState.user }}</h2>
      <div>
        <form @submit.prevent="onFormSubmit" class="max-w-sm mx-auto">
          <div class="mb-5">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
            <input v-model="name" type="text" id="name"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="John Doe" required />
          </div>
          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input v-model="email" type="email" id="email"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com" required />
          </div>
          <div class="mb-5">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
              password</label>
            <input v-model="password" type="password" id="password"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required />
          </div>
          <div class="mb-5">
            <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat
              password</label>
            <input v-model="confirmPassword" type="password" id="repeat-password"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required />
          </div>
          <div class="flex items-start mb-5">
            <div class="flex items-center h-5">
              <input id="terms" type="checkbox" value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required />
            </div>
            <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a
                href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
          </div>
          <button type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register
            new account</button>
        </form>


      </div>
    </section>
  </div>
</template>
