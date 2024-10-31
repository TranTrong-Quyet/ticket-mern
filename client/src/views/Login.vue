<script setup>

import axios from 'axios'
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import { useRouter } from 'vue-router';

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

import { ref, reactive, toRefs, TrackOpTypes } from 'vue';
const fromData = ref({
  email: "",
  password: "",
})

const { email, password } = toRefs(fromData.value)

const showError = (summary, detail) => {
  toast.add({
    severity: "error",
    summary,
    detail,
    life: 3000,
  })
}

const onFormSubmit = async () => {
  try {
    if (!email.value || !password.value) {
      showError('Hey', 'Please enter your account')
    }
    if (email.value && password.value) {
      const userData = {
        email: email.value,
        password: password.value,

      }
      authStore.login(userData)

      router.push('/')
    }

  } catch (error) {
    console.log('Error when submit login form', error)
  }
}

//test store pinia



</script>

<template>
  <div class="h-ful">
    <Toast />
    <section class="py-20 flex flex-col item-center">
      <h2 class=" self-center text-3xl font-medium pb-10">Login</h2>
      <div>
        <form @submit.prevent="onFormSubmit" class="max-w-sm mx-auto">
          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Your email</label>
            <input v-model="email" type="email" id="email"
              class="bg-gray-50 border border-gray-300text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com" required />
          </div>
          <div class="mb-5">
            <label for="password" class="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Your
              password</label>
            <input v-model="password" type="password" id="password"
              class="bg-gray-50 border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required />
          </div>
          <div class="flex items-start mb-5">
            <div class="flex items-center h-5">
              <input id="remember" type="checkbox" value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required />
            </div>
            <label for="remember" class="ms-2 text-sm font-medium text-slate-900 dark:text-gray-300">Remember me</label>
          </div>
          <button type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
        </form>

      </div>
    </section>
  </div>
</template>