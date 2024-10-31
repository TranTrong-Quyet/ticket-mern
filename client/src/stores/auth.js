import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const initialState = ref({
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  });

  // Create axios instance with base configuration
  const api = axios.create({
    baseURL: "http://localhost:3000", // Replace with your actual backend URL
    headers: {
      "Content-Type": "application/json",
    },
  });

  const register = async (userData) => {
    try {
      initialState.value.isLoading = true;
      initialState.value.isError = false;
      initialState.value.isSuccess = false;

      const response = await api.post("/api/users", userData);

      console.log("Registration response:", response.data); // Debug log

      if (response.data) {
        initialState.value.user = {
          _id: response.data._id,
          name: response.data.name,
          email: response.data.email,
        };
        initialState.value.isSuccess = true;
        initialState.value.message = "Registration successful";

        // Store the token if your backend returns it
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(initialState.value.user));
        }

        return response.data;
      }
    } catch (error) {
      console.error("Registration error:", error.response?.data || error); // Debug log
      initialState.value.isError = true;
      initialState.value.message =
        error.response?.data?.message || "Registration failed";
      throw error;
    } finally {
      initialState.value.isLoading = false;
    }
  };

  // ... rest of your store code

  return {
    initialState,
    register,
    // ... other methods
  };
});
