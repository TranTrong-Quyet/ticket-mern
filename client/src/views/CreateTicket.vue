<script setup>
import { useAuthStore } from '@/stores/auth';
import { useTicketStore } from '@/stores/ticket.store';
import { onMounted, ref, toRefs, useTemplateRef } from 'vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const router = useRouter()

const userStore = useAuthStore();
const ticketStore = useTicketStore();

const toast = useToast()

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
        life: 5000,
    })
}

const formData = ref({
    product: "",
    description: "",
})

const { product, description } = toRefs(formData.value)

// change submit button on submit
const button = useTemplateRef("submitButton")

onMounted(() => {
    console.log(button.value.textContent)
})

// Form submission handler
const handleOnSubmit = async () => {
    // Handle form submission
    try {
        if (!product.value || !description.value) {
            showError('In valid input', "Please include all fields")
        }
        if (product.value && description.value) {
            const ticketData = {
                product: product.value,
                description: description.value,
            }
            console.log(ticketData)

            button.value.textContent = 'Sending your ticket...'

            const createTicketResult = await ticketStore.submitTicket(ticketData)
            console.log(createTicketResult)

            showSuccess('Success message', 'Your ticket is send successfully')

            if (createTicketResult) {
                button.value.textContent = "Submit new ticket"
            }

            ticketStore.resetTicket()

            router.push('/my-ticket')
        }

    } catch (error) {
        console.error('There is an error:', error)
    }

};

</script>

<template>
    <section class="px-5 py-32 flex flex-col items-center justify-start">
        <Toast />
        <h1 class="text-4xl font-bold text-orange-600 mb-4">
            <span v-if="userStore.initialState.user">
                Hey {{ userStore.initialState.user.name }},
            </span>
            Create a ticket
        </h1>

        <p class="text-lg text-gray-100 mb-8">
            Fill your ticket information below
        </p>

        <div class="w-full max-w-2xl">
            <form @submit.prevent="handleOnSubmit">
                <div class="mb-5">
                    <label for="product" class="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Select
                        product</label>
                    <select v-model="product" type="select" id="product"
                        class="bg-gray-50 border border-gray-300text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com">

                        <option selected>Choose a product</option>
                        <option value="Ipad">Ipad</option>
                        <option value="Macbook">Macbook</option>
                        <option value="Iphone">Iphone</option>
                        <option value="Mac Mini">Mac Mini</option>
                        <option value="iMac">iMac</option>

                    </select>
                </div>
                <div class="mb-5">
                    <label for="description"
                        class="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Description</label>
                    <textarea v-model="description" type="text" placeholder="Tell us detail about the issue"
                        id="description" rows="4"
                        class="bg-gray-50 border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>

                <button type="submit" ref="submitButton"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                    Ticket</button>
            </form>

        </div>
    </section>
</template>
