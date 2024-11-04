// utils/useAuthStatus.js
import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";

export const useAuthStatus = () => {
  const store = useAuthStore();

  // !!  operator to ensure boolean return value for loggedIn
  const loggedIn = computed(() => !!store.initialState.user);
  const user = computed(() => store.initialState.user);

  return {
    loggedIn,
    user,
  };
};
