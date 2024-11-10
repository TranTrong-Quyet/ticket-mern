import { defineStore } from "pinia";

import axios from "axios";
import { ref } from "vue";

// import { useAuthStore } from "./auth";
// const authStore = useAuthStore();

// get user token

const useTicketStore = defineStore("ticket", () => {
  const initialState = ref({
    ticket: {
      product: "",
      description: "",
    },
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
  });

  const api = axios.create({
    baseURL: "http://localhost:8000", // Replace with your actual backend URL
    headers: {
      "Content-Type": "application/json",
    },
  });
  const submitTicket = async (ticketData) => {
    try {
      initialState.value.isLoading = true;
      initialState.value.message = "Sending ticket";

      const token = localStorage.getItem("token");
      console.log(token);

      const response = await api.post("/api/tickets/create", ticketData, {
        headers: {
          Authorization: `Bearer ${token}`, // Replace with actual token if needed
        },
      });

      if (response.data) {
        console.log("there is a response");
        initialState.value.isSuccess = true;
        initialState.value.message = "Registration successful";

        initialState.value.ticket = {
          product: response.data.product,
          description: response.data.description,
        };
      }
      return response.data;
    } catch (error) {
      console.error("There is an error:", error);
    }
  };

  const resetTicket = () => {
    initialState.value.ticket = { product: "", description: "" };
    initialState.value.isError = false;
    initialState.value.isLoading = false;
    initialState.value.isSuccess = false;
    initialState.value.message = "";
  };

  return { initialState, submitTicket, resetTicket };
});

export { useTicketStore };
