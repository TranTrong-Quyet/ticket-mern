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

  const addNote = async (ticketId, noteData) => {
    try {
      const token = localStorage.getItem("token");

      initialState.value.isLoading = true;
      initialState.value.message = "Submitting your note";

      const response = await api.post(
        `/api/tickets/${ticketId}/notes/`,
        noteData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data) {
        initialState.value.isSuccess = true;
        initialState.value.message = "Returned notes data";
        initialState.value.isSuccess = true;
        initialState.value.notes = initialState.value.notes.push(response.data);
      }

      return response.data;
    } catch (error) {
      initialState.value.isError = true;
      initialState.value.message = error.message || "Failed to add note";
      console.error("There is an error when adding note:", error);
    } finally {
      initialState.value.isLoading = false;
    }
  };

  return { addNote, initialState, getNote };
});

export { useNoteStore };
