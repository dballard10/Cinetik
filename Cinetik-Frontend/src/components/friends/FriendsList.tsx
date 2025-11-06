import { useState } from "react";
import { Input } from "@/components/ui/input";
import { TbSearch, TbUserPlus } from "react-icons/tb";
import { friendsApi } from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import Friend from "./Friend";

interface FriendData {
  id: number;
  name: string;
  username?: string;
  avatar?: string;
}

const FriendsList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: friendsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: friendsApi.getFriends,
  });

  if (isLoading) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-gray-700/50">
        <div className="p-8 text-center text-gray-400">
          <p>Loading friends...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-gray-700/50">
        <div className="p-8 text-center text-red-400">
          <p>Error loading friends: {(error as Error).message}</p>
        </div>
      </div>
    );
  }

  // Handle both array and object responses from the API
  const friends = Array.isArray(friendsData)
    ? friendsData
    : friendsData?.friends || [];

  const filteredFriends = friends.filter(
    (friend: FriendData) =>
      (friend.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (friend.username?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Search friends..."
          className="pl-10 bg-gray-800/50 border-gray-700 text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <TbSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      {/* Friends List */}
      <div className="bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-gray-700/50">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Your Friends ({filteredFriends.length})
          </h2>
          <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors">
            <TbUserPlus className="w-5 h-5" />
            <span>Add Friend</span>
          </button>
        </div>

        {filteredFriends.length > 0 ? (
          <div className="divide-y divide-gray-700/50">
            {filteredFriends.map((friend: FriendData) => (
              <div
                key={friend.id}
                className="p-4 flex items-center justify-between hover:bg-gray-700/30 transition-colors"
              >
                <Friend username={friend.username} avatar={friend.avatar} />
              </div>
            ))}
          </div>
        ) : searchQuery ? (
          <div className="p-8 text-center text-gray-400">
            <p className="text-xl mb-2">No friends found</p>
            <p>Try searching with a different name</p>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-400">
            <p className="text-xl mb-2">No friends yet</p>
            <p>Add some friends to see their activity and recommendations</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsList;
