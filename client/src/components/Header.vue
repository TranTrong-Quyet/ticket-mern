<template>
    <div class="flex w-full border-b border-slate-300">
        <header class="flex flex-row justify-between w-full px-5 py-4 bg-white text-slate-800 items-center">
            <div>
                <h2>
                    <RouterLink to="/">Logo
                    </RouterLink>
                </h2>
            </div>
            <div>
                <nav>
                    <ul class="flex gap-4 font-medium ">
                        <li>
                            <RouterLink to="/login" class="flex gap-2 items-center hover:text-orange-500">
                                <LogIn color=" black" :size="18" />Login
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/register" class="flex gap-2 items-center hover:text-orange-500">
                                <ChevronLast color="black" :size="18" /> <span>Register</span>
                            </RouterLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { LogIn, ChevronLast } from 'lucide-vue-next';


</script>

<style></style>