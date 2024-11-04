// components/PrivateLayout.vue
<script setup>
import { useAuthStatus } from '@/utils/useAuthStatus';
import { useRouter } from 'vue-router';
import { onMounted, watch, ref } from 'vue';

const router = useRouter();
const { loggedIn } = useAuthStatus();
const isLoading = ref(true);

onMounted(() => {
    if (!loggedIn.value) {
        router.push('/login');
    }
    isLoading.value = false;
});

watch(loggedIn, (isLoggedIn) => {
    if (!isLoggedIn) {
        router.push('/login');
    }
});
</script>

<template>
    <div>
        <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
            <!-- Add your loading spinner here -->
            Loading...
        </div>
        <RouterView v-else-if="loggedIn" />
    </div>
</template>