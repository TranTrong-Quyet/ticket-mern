<script setup>
console.log('My Ticket')
import { onMounted, ref, toRef } from 'vue'
import { defineProps } from 'vue';
import TicketItem from '@/components/TicketItem.vue';
import { useTicketStore } from '../stores/ticket.store.js';
import dotenv from 'dotenv'

const ticketStore = useTicketStore()

const props = defineProps({
    limitPostView: {
        type: Number,
        default: 5
    },
    showMoreButton: {
        type: Boolean,
        default: false,
    }
})


const limitView = ref(props.limitPostView);


import axios from 'axios';
import router from '@/router';



const userTickets = ref([])



const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

const getTickets = async () => {
    const token = localStorage.getItem("token");
    console.log(token);

    try {
        const response = await api.get('api/tickets/', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        console.log(response)

        if (response.data) {
            userTickets.value = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            console.log(`this is it: ${JSON.stringify(userTickets)}`)
        }
    } catch (error) {
        console.error("Error fetching tickets:", error);
    }

}

onMounted(() => {
    getTickets()
})

const handleViewAllTicket = () => {
    limitView.value = userTickets.value.length;
};

const goToTicket = () => {
    router.push('/tickets')
}


</script>

<template>
    <section class="px-5 py-28 flex flex-col items-center justify-start">
        <Toast />
        <div class="max-w-10xl w-100 ">
            <div class="flex flex-row mb-6 justify-between items-center align-middle">
                <h2 class="text-2xl font-bold">My Ticket</h2>
                <button>
                    <RouterLink to="/create-ticket"
                        class="px-4 py-2 text-sm font-medium text-white bg-transparent border rounded-full hover:bg-blue-700">
                        Create new ticket
                    </RouterLink>
                </button>
            </div>

            <div>
                <div v-if="ticketStore.initialState.isLoading">loading.....</div>
                <ul v-if="userTickets.length" class="space-y-4">
                    <TicketItem v-for="(ticket, index) in userTickets.slice(0, limitView || userTickets.length)"
                        :key="ticket._id || index" :ticket="ticket" />
                </ul>
                <div v-if="!userTickets.length"
                    class="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg shadow-md">
                    <h1 class="text-lg text-gray-600 font-semibold mb-4">You haven't created any ticket</h1>
                    <RouterLink to="/create-ticket">
                        <button
                            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                            Create New Ticket
                        </button>
                    </RouterLink>
                </div>
                <div v-if="userTickets.length > limitView" class="mt-6 text-center">
                    <button @click="handleViewAllTicket"
                        class="px-4 py-2 text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 hover:text-orange-500 rounded-lg ">
                        View All Tickets
                    </button>
                </div>

            </div>
        </div>
    </section>
</template>