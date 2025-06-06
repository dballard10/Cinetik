import { create } from "zustand";

interface Friend {
  id: number;
  username: string;
  email: string;
  imageUrl: string;
  bannerColor: string;
  stats: {
    watched: number;
    reviews: number;
    favorites: number;
    friends: number;
  };
}

interface FriendState {
  selectedFriend: Friend | null;
  setSelectedFriend: (friend: Friend) => void;
  clearSelectedFriend: () => void;
}

const useFriendStore = create<FriendState>()((set) => ({
  selectedFriend: null,
  setSelectedFriend: (friend) => set({ selectedFriend: friend }),
  clearSelectedFriend: () => set({ selectedFriend: null }),
}));

export default useFriendStore;
