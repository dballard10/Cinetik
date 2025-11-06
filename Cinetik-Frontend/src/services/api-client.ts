// src/services/api.ts
import axios from "axios";
import { Media } from "@/entities/media";

// Get API base URL from environment with fallback
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;

  // If no environment variable is set, use different defaults based on environment
  if (!envUrl) {
    if (import.meta.env.PROD) {
      // In production, you need to set VITE_API_BASE_URL in Vercel environment variables
      console.error(
        "⚠️ VITE_API_BASE_URL is not set in production environment"
      );
      return ""; // This will cause relative requests to fail, which is better than localhost
    } else {
      // In development, default to localhost
      return "http://localhost:8000";
    }
  }

  return envUrl;
};

const VITE_API_BASE_URL = getApiBaseUrl();

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

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "NETWORK_ERR" || error.message?.includes("CORS")) {
      console.error(
        "🚨 Network/CORS Error: Make sure your backend is running and CORS is configured properly.",
        "\n   Backend URL:",
        VITE_API_BASE_URL,
        "\n   Error:",
        error.message
      );
    }
    return Promise.reject(error);
  }
);

// --------------------------Favorites API---------------------------

export const favoritesApi = {
  getFavorites: async (page: number = 1, limit: number = 20) => {
    try {
      const url = `/favorites?page=${page}&limit=${limit}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error(
        `❌ API Error for GET /favorites?page=${page}&limit=${limit}:`,
        error
      );
      throw error;
    }
  },

  addFavorite: async (media: Media) => {
    const currentFavorites = await api.get("/favorites");
    if (currentFavorites.data.length >= 100) {
      throw new Error("Maximum number of favorites (100) reached");
    }
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

  getFavoritesLength: async () => {
    const response = await api.get("/favorites/length");
    return response.data;
  },
};

// --------------------------Watches API---------------------------

export const watchesApi = {
  getWatches: async (page: number = 1, limit: number = 20) => {
    try {
      const url = `/watches?page=${page}&limit=${limit}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error(
        `❌ API Error for GET /watches?page=${page}&limit=${limit}:`,
        error
      );
      throw error;
    }
  },

  addWatch: async (media: Media) => {
    const currentWatches = await api.get("/watches");
    if (currentWatches.data.length >= 500) {
      throw new Error("Maximum number of watches (500) reached");
    }
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

  getWatchesLength: async () => {
    const response = await api.get("/watches/length");
    return response.data;
  },
};

// --------------------------Friends API---------------------------

export const friendsApi = {
  getFriends: async () => {
    try {
      const url = `/friends`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error(`❌ API Error for GET /friends:`, error);
      throw error;
    }
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

  getFriendsLength: async () => {
    const response = await api.get("/friends/length");
    return response.data;
  },
};
