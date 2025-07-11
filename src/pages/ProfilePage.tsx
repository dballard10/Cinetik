import { Navigation } from "@/components/page-components/Navigation";
import { useState } from "react";
import defaultProfilePic from "@/assets/default-profile-pic.webp";
import { Card } from "@/components/ui/card";
import { TbPencil } from "react-icons/tb";
import UserFavorites from "@/components/profile/UserFavorites";
import { favoritesApi, friendsApi, watchesApi } from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Temporary mock data for user and favorites
const mockUser = {
  name: "Dylan Ballard",
  email: "dylan@example.com",
  imageUrl: defaultProfilePic,
  bannerColor: "from-purple-600 to-blue-800",
};

const ProfilePage = () => {
  // const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  // Get real favorites count
  const { data: favoritesData } = useQuery({
    queryKey: ["favorites-count"],
    queryFn: async () => {
      const data = await favoritesApi.getFavoritesLength();
      return data;
    },
  });
  const { data: watchesData } = useQuery({
    queryKey: ["watches-count"],
    queryFn: async () => {
      const data = await watchesApi.getWatchesLength();
      return data;
    },
  });
  const {
    data: friendsData,
    isLoading: friendsLoading,
    error: friendsError,
  } = useQuery({
    queryKey: ["friends-count"],
    queryFn: async () => {
      try {
        const data = await friendsApi.getFriends();
        return data?.friends || data || [];
      } catch (error) {
        console.error("Friends query error:", error);
        return [];
      }
    },
  });
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      <Navigation />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto py-8 px-4">
          {/* Banner Section */}
          <div
            className={`w-full h-48 rounded-xl bg-gradient-to-r ${mockUser.bannerColor} mb-16 relative`}
          >
            {/* Profile Picture */}
            <div className="absolute -bottom-12 left-8">
              <div className="relative">
                <img
                  src={mockUser.imageUrl}
                  alt={mockUser.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gray-900"
                />
                {/* <button
                  className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <TbPencil className="w-4 h-4" />
                </button> */}
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* User Details Column */}
            <div className="md:w-1/3">
              <Card className="p-6 bg-gray-800/50 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700/50 h-full">
                <h2 className="text-2xl font-bold mb-2">{mockUser.name}</h2>
                <p className="text-gray-400 mb-4">{mockUser.email}</p>

                <div className="border-t border-gray-700 my-4 pt-4">
                  <h3 className="text-xl font-semibold mb-2">Stats</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-700/50 p-3 rounded-lg">
                      <p className="text-gray-400 text-sm">Watches</p>
                      <p className="text-xl font-bold">
                        {watchesData?.length || "-"}
                      </p>
                    </div>
                    {/* <div className="bg-gray-700/50 p-3 rounded-lg">
                      <p className="text-gray-400 text-sm">Reviews</p>
                      <p className="text-xl font-bold">18</p>
                    </div> */}
                    <div className="bg-gray-700/50 p-3 rounded-lg">
                      <p className="text-gray-400 text-sm">Favorites</p>
                      <p className="text-xl font-bold">
                        {favoritesData?.length || "-"}
                      </p>
                    </div>
                    {/* <div className="bg-gray-700/50 p-3 rounded-lg">
                      <p className="text-gray-400 text-sm">Friends</p>
                      <p className="text-xl font-bold">
                        {friendsLoading
                          ? "..."
                          : friendsError
                          ? "Error"
                          : friendsData?.length ?? 0}
                      </p>
                    </div> */}
                  </div>
                </div>
              </Card>
            </div>

            {/* Favorite Shows Column */}
            <div className="md:w-2/3">
              <Card className="p-6 bg-gray-800/50 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700/50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">Favorites</h3>
                  <button
                    onClick={() => {
                      navigate("/library");
                    }}
                    className="text-sm bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-full transition-colors"
                  >
                    View All
                  </button>
                </div>
                <UserFavorites />
              </Card>

              {/* Activity Feed */}
              {/* <Card className="p-6 bg-gray-800/50 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700/50 mt-6">
                <h3 className="text-2xl font-bold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-3 border-b border-gray-700">
                    <img
                      src={mockUser.imageUrl}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p>
                        <span className="font-semibold">You</span> watched{" "}
                        <span className="text-purple-400">Stranger Things</span>
                      </p>
                      <p className="text-sm text-gray-400">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pb-3 border-b border-gray-700">
                    <img
                      src={mockUser.imageUrl}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p>
                        <span className="font-semibold">You</span> added{" "}
                        <span className="text-purple-400">The Mandalorian</span>{" "}
                        to favorites
                      </p>
                      <p className="text-sm text-gray-400">1 week ago</p>
                    </div>
                  </div>
                </div>
              </Card> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
