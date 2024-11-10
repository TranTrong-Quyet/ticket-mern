import { defineStore } from "pinia";

import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";

const useNoteStore = defineStore("note", () => {
  const initialState = ref({
    notes: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
  });

  const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const getNote = async () => {
    try {
      const token = localStorage.getItem("token");
      const route = useRoute();
      const response = await api.get(`/api/tickets/${route.params.id}/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        initialState.value.notes = response.data;
        initialState.value.isSuccess = true;
      }
    } catch (error) {
      throw new Error(error);
      initialState.value.message = error.message || "Failed to fetch note";
    } finally {
      initialState.value.isLoading = false;
    }
  };

  const addNote = async (noteData) => {
    try {
      api.post();
    } catch (error) {}
  };

  return { addNote, initialState, getNote };
});

export { useNoteStore };
