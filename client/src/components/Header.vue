<script setup>
import { RouterLink } from 'vue-router';
import { LogIn, LogOut, ChevronLast } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth';

const userStore = useAuthStore()
</script>

<template>
    <div class="flex w-full border-b border-slate-300">
        <header class="flex flex-row justify-between w-full px-5 py-4 bg-white text-slate-800 items-center">
            <div class="flex gap-4 items-center">
                <h2>
                    <RouterLink to="/" class="text-3xl uppercase font-bold">Logo
                    </RouterLink>
                </h2>
                <div class="w-[2px] h-4 bg-orange-950"></div>
                <div v-if="userStore.initialState.user"> Loged in as: {{ userStore.initialState.user.name }}</div>
            </div>
            <div>
                <nav>
                    <ul class="flex gap-4 font-medium ">
                        <li v-if="!userStore.initialState.user">
                            <RouterLink to="/login" class="flex gap-2 items-center hover:text-orange-500">
                                <LogIn color=" black" :size="18" />Login
                            </RouterLink>
                        </li>

                        <li v-if="!userStore.initialState.user">
                            <RouterLink to="/register" class="flex gap-2 items-center hover:text-orange-500">
                                <ChevronLast color="black" :size="18" /> <span>Register</span>
                            </RouterLink>
                        </li>
                        <div v-else>
                            <RouterLink to="/logout" class="flex gap-2 items-center hover:text-orange-500">
                                <span> Log out</span>
                                <LogOut color="black" :size="18" />
                            </RouterLink>
                        </div>
                    </ul>
                </nav>
            </div>
        </header>
    </div>
</template>



<style></style>