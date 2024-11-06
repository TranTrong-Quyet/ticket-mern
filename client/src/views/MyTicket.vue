<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios';
import moment from 'moment';
import router from '@/router';

const formatDate = (dateString) => {
    return moment(dateString).format('MMM D, YYYY, h:mm A'); // Example: November 5, 2024, 3:20 PM
};

const userTickets = ref([])

const API_URL = 'http://localhost:8000/'

const api = axios.create({
    baseURL: API_URL,
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


            userTickets.value = response.data
            console.log(`this is it: ${JSON.stringify(userTickets)}`)

        }
    } catch (error) {
        console.error("Error fetching tickets:", error);
    }

}

onMounted(() => {
    getTickets()
})

const goToTicket = () => {
    router.push('/tickets')
}


</script>

<template>
    <section class="px-5 py-28 flex flex-col items-center justify-start">
        <Toast />
        <div class="max-w-10xl w-100 ">
            <h2 class="text-2xl font-bold mb-6">My Ticket</h2>
            <div>
                <ul class="space-y-4">
                    <li v-for="ticket in userTickets" :key="ticket._id"
                        class="border border-gray-200 p-4 rounded-lg shadow-md bg-white">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-800">Product: {{ ticket.product }}</h3>
                                <p class="text-gray-600">Description: {{ ticket.description }}</p>
                            </div>
                            <div>
                                <span class="px-2 py-1 text-sm font-medium bg-blue-100 text-blue-600 rounded-full">{{
                                    ticket.status }}</span>
                            </div>
                        </div>
                        <div class="flex justify-between items-center mt-4">
                            <div class="text-sm text-gray-500 space-y-1">
                                <span>Created at: {{ formatDate(ticket.createdAt) }}</span><br>
                                <span>Latest update: {{ formatDate(ticket.updatatedAt) }}</span>
                            </div>
                            <div>
                                <button @click="goToTicket"
                                    class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">View
                                    Ticket</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </section>
</template>