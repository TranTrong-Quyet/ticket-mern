<script setup>
import { useAuthStore } from '@/stores/auth';
const userStore = useAuthStore()

</script>

<template>
  <section class="h-screen px-5 py-32 flex flex-col items-center justify-start">
    <h1 class="text-4xl font-bold text-orange-600 mb-4">
      <span v-if="userStore.initialState.user">Hey {{ userStore.initialState.user.name }},</span>
      Open a ticket!
    </h1>
    <p class="text-lg text-gray-100 mb-8">Get stuck? Open a ticket now!</p>
    <div class="flex flex-col gap-y-3 sm:flex-row sm:space-x-4">
      <button
        class="min-w-[200px] px-6 py-2 rounded-lg text-white bg-orange-600 hover:bg-orange-700 transition-colors duration-200 shadow-md">
        <RouterLink to="/my-tickets">
          Open new ticket
        </RouterLink>

      </button>
      <button
        class="min-w-[200px] px-6 py-2 rounded-lg text-orange-600 border border-orange-600 hover:bg-orange-100 transition-colors duration-200 shadow-md">
        <RouterLink to="/create-ticket">
          View my tickets
        </RouterLink>
      </button>
    </div>
  </section>


</template>
