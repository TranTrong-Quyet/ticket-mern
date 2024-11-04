<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
// import { Vueform, TextElement, SelectElement, TextareaElement, ButtonElement } from '@vueform/vueform'

const userStore = useAuthStore();

// Form configuration
// const formConfig = ref({
//     size: 'md',
//     displayErrors: false,
//     addClass: 'vf-create-account'
// });

// Form schema
const schema = ref({
    product: {
        type: 'select',
        items: [
            {
                value: 0,
                label: 'Label',
            },
        ],
        search: true,
        native: false,
        label: 'Choose a product',
        inputType: 'search',
        autocomplete: 'on',
    },
    description: {
        type: 'textarea',
        label: 'Description',
    }
});

// Form submission handler
// const onSubmit = (values) => {
//     console.log('Form submitted:', values);
//     // Handle form submission
// };

// Form validation
const validation = {
    product: { required: true },
    description: { required: true, min: 10 }
};
</script>

<template>
    <section class="px-5 py-32 flex flex-col items-center justify-start">
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
            <Vueform>
                <SelectElement name="product" :items="['Iphone', 'Ipad', 'Macbook']" rules="required"
                    label="Choose the product you have an issue with" />
                <TextareaElement name="description" label="Description" rules="required|min:20"
                    placeholder="Describe the issue with your product" />
                <ButtonElement type="submit" button-label="Submit Ticket" />
            </Vueform>

        </div>
    </section>
</template>

<!-- <style>
/* .vf-create-account {
    /* Add your custom form styles here */
/* @apply w-full;
} */

/* */
*/
</style> -->