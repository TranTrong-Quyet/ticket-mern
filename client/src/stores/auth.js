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

  const register = async (user) => {
    console.log(`This is data delivered to the store:`, user);
  };

  const login = async (user) => {
    console.log(
      `This is user data from login from, deliverd from the login component:`,
      user,
    );
  };

  return { initialState, register, login };
});
