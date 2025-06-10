// src/services/api.ts
import axios from "axios";
import { Media } from "@/entities/media";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Update this with your backend URL

// Create axios instance with auth header
const api = axios.create({
  baseURL: VITE_API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --------------------------Favorites API---------------------------

export const favoritesApi = {
  getFavorites: async () => {
    try {
      const response = await api.get("/favorites");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addFavorite: async (media: Media) => {
    const response = await api.post("/favorites", { media });
    return response.data;
  },

  removeFavorite: async (mediaId: number) => {
    await api.delete(`/favorites/${mediaId}`);
  },

  findAllFavorites: async (content: Media[]) => {
    for (const item of content) {
      const response = await api.get(`/favorites/is-favorite/${item.id}`);
      item.isFavorite = response.data;
    }
    return content;
  },

  isFavorite: async (mediaId: number) => {
    const response = await api.get(`/favorites/is-favorite/${mediaId}`);
    return response.data;
  },
};

// --------------------------Watches API---------------------------

export const watchesApi = {
  getWatches: async () => {
    try {
      const response = await api.get("/watches");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addWatch: async (media: Media) => {
    const response = await api.post("/watches", { media });
    return response.data;
  },

  removeWatch: async (mediaId: number) => {
    await api.delete(`/watches/${mediaId}`);
  },

  findAllWatches: async (content: Media[]) => {
    for (const item of content) {
      const response = await api.get(`/watches/is-watched/${item.id}`);
      item.isWatched = response.data;
    }
    return content;
  },

  isWatched: async (mediaId: number) => {
    const response = await api.get(`/watches/is-watched/${mediaId}`);
    return response.data;
  },
};

// --------------------------Friends API---------------------------

export const friendsApi = {
  getFriends: async () => {
    const response = await api.get("/friends");
    return response.data;
  },

  getFriend: async (friendId: number) => {
    const response = await api.get(`/friends/${friendId}`);
    return response.data;
  },

  addFriend: async (friendId: number) => {
    const response = await api.post(`/friends`, { friendId });
    return response.data;
  },

  removeFriend: async (friendId: number) => {
    await api.delete(`/friends/${friendId}`);
  },
};
