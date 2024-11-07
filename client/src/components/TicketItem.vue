<script setup>
import { defineProps } from 'vue';

import { formatDate } from '../utils/formatDate.js'

const props = defineProps({
    ticket: Object,
})

console.log(props.ticket)
</script>

<template>
    <li class="border border-gray-200 p-4 rounded-lg shadow-md bg-white">
        <div class="flex justify-between items-start mb-2">
            <div>
                <h3 class="text-lg font-semibold text-gray-800">Product: {{ ticket.product }}</h3>
                <p class="text-gray-600">Description: {{ ticket.description }}</p>
            </div>
            <div>
                <span :class="[
                    'px-2 py-1 text-sm font-medium rounded-full',
                    ticket.status === 'new' ? 'bg-blue-100 text-blue-600' :
                        ticket.status === 'opened' ? 'bg-green-100 text-green-600' :
                            ticket.status === 'close' ? 'bg-yellow-100 text-yellow-600' : ''
                ]">{{
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
</template>