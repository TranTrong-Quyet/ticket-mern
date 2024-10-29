<script setup>
</script>

<template>
  <section class="h-screen px-5 py-32 flex flex-col items-center justify-start bg-gray-50">
    <h1 class="text-4xl font-bold text-orange-600 mb-4">Open a ticket!</h1>
    <p class="text-lg text-gray-600 mb-8">Get stuck? Open a ticket now!</p>
    <div class="space-x-4">
      <button
        class="px-6 py-2 rounded-lg text-white bg-orange-600 hover:bg-orange-700 transition-colors duration-200 shadow-md">
        <RouterLink to="/my-tickets">
          Open new ticket
        </RouterLink>

      </button>
      <button
        class="px-6 py-2 rounded-lg text-orange-600 border border-orange-600 hover:bg-orange-100 transition-colors duration-200 shadow-md">
        <RouterLink to="/create-ticket">
          View my tickets
        </RouterLink>
      </button>
    </div>
  </section>


</template>
