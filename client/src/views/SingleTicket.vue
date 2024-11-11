<script setup>
import axios from 'axios';
import { onMounted, ref, toRef, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import { formatDate } from '@/utils/formatDate';

import { FwbButton, FwbModal } from 'flowbite-vue'

const isShowModal = ref(false)

function closeModal() {
    isShowModal.value = false
}
function showModal() {
    isShowModal.value = true
}

import { useNoteStore } from '@/stores/note.store';

const noteStore = useNoteStore()
const toast = useToast()
const route = useRoute()
const router = useRouter()

const showError = (summary, detail) => {
    toast.add({
        severity: "error",
        summary,
        detail,
        life: 3000,
    })
}

const showSuccess = (summary, detail) => {
    toast.add({
        severity: "success",
        summary,
        detail,
        life: 3000,
    })
}

// Modal 



const ticket = ref({})
const notes = ref([])

const noteFormData = ref({
    noteText: ""
});

const { noteText } = toRefs(noteFormData.value)


const API_URL = 'http://localhost:8000/'
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

const getTicket = async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await api.get(`api/tickets/${route.params.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        if (response.data) {
            ticket.value = response.data
            console.log(ticket.value)
        } else {
            showError('Error', "There is an error fetching data")
        }
    } catch (error) {
        console.error('There is an error', error)
    }
}

onMounted(async () => {
    getTicket();
    await noteStore.getNote()
    console.log(noteStore.initialState.notes)
    notes.value = noteStore.initialState.notes;
})

const closeTicket = async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await api.put(`api/tickets/${route.params.id}`, { status: "closed" }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        if (response) {
            showSuccess('Ticket Closed Successfully', "Ticket is closed, Enjoy")
            router.push('my-ticket')
        }

        if (response.status == "success") {
            console.log('closed success')
        }

    } catch (error) {
        console.error('There is an error', error)
    }
}

// handleAddNoteFormSubmit
const handleAddNoteFormSubmit = async () => {
    try {
        const ticketId = route.params.id

        const noteData = {
            text: noteText.value
        }
        console.log(noteData)
        const addNoteResult = await noteStore.addNote(ticketId, noteData)

        if (addNoteResult) {
            showSuccess('Note Added Successfully', 'Your note has been added.');
            closeModal()
            noteText.value = ""
        } else {
            showError('Error', 'Failed to add note.');
        }
        console.log(addNoteResult)
    } catch (error) {
        console.error('there is an error', error)
    }
}



</script>

<template>
    <div class="w-[950px] mx-auto p-4 md:p-8 lg:p-12">
        <Toast />
        <div class="bg-blue-300">{{ noteStore.initialState.note }}</div>
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-md space-y-6">
            <!-- Ticket Header -->
            <div class="space-y-2">
                <div class="flex items-center justify-between">
                    <h1 class="text-lg font-semibold text-gray-800">Product: <span class="text-gray-600">{{
                        ticket.product }}</span>
                    </h1>
                    <span :class="[
                        'px-2 py-1 text-sm font-medium rounded-full',
                        ticket.status === 'new' ? 'bg-blue-100 text-blue-600' : '',
                        ticket.status === 'opened' ? 'bg-green-100 text-green-600' : '',
                        ticket.status === 'closed' ? 'bg-yellow-100 text-yellow-600' : '',
                    ]">{{ ticket.status }}</span>
                </div>
                <div class="text-sm text-gray-500">Created at: {{ formatDate(ticket.createdAt) }}</div>
            </div>
            <div class="w-full h-[1px] bg-slate-300"></div>
            <!-- Ticket Description -->
            <div>
                <h2 class="text-xl font-bold text-gray-800">Issue:</h2>
                <p class="text-gray-700 mt-2 font-medium text-lg">{{ ticket.description }}</p>
            </div>

            <!-- Ticket Replies Section -->
            <div class="space-y-4">
                <h1 class="text-lg font-semibold text-gray-800">Notes</h1>
                <div class="flex flex-col gap-y-4">
                    <div v-for="note in notes" :key="note._id"
                        class="bg-gray-100 border flex items-start justify-between border-gray-200 rounded-lg p-4">
                        <p class="text-gray-700">{{ note.text }}</p>
                        <span class="text-gray-700 italic text-sm">{{ formatDate(note.createdAt) }}</span>
                    </div>

                </div>
                <div class="flex justify-center">
                    <fwb-button @click="showModal" v-if="ticket.status !== 'closed'"
                        class="mt-4 px-4 py-2 text-sm font-medium text-white bg-slate-700 rounded-lg hover:bg-slate-800">
                        Add note
                    </fwb-button>
                    <button @click="closeTicket" v-if="ticket.status !== 'closed'"
                        class="mt-4 ml-auto px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-100 bg-slate-200 rounded-lg hover:bg-slate-800">
                        Close Ticket
                    </button>
                </div>
            </div>
        </div>

        <!-- Modal -->


        <fwb-modal v-if="isShowModal" @close="closeModal">
            <template #header>
                <div class="flex items-center text-lg text-slate-800">
                    Add new note
                </div>
            </template>
            <template #body>
                <div>
                    <form @submit.prevent="handleAddNoteFormSubmit">
                        <div class="mb-5">
                            <label for="noteText"
                                class="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Note
                                content</label>
                            <textarea v-model="noteText" type="text" placeholder="Write your note here" id="noteText"
                                rows="4"
                                class="bg-gray-50 border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        <button type="submit" ref=""
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Submit note</button>
                    </form>
                </div>
            </template>
            <template #footer>
                <div class="flex justify-between">
                    <fwb-button @click="closeModal" color="alternative">
                        Cancel
                    </fwb-button>

                </div>
            </template>
        </fwb-modal>
    </div>


</template>
