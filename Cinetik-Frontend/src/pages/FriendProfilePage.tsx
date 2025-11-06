import { Navigation } from "@/components/page-components/Navigation";
import { Card } from "@/components/ui/card";
import UserFavorites from "@/components/profile/UserFavorites";
import useFriendStore from "@/hooks/use-friend-store";

interface FriendProfilePageProps {
  username: string;
}

const FriendProfilePage = ({ username }: FriendProfilePageProps) => {
  const { selectedFriend } = useFriendStore();

  // If no friend is selected, show a fallback
  if (!selectedFriend) {
    return (
      <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
        <Navigation />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto py-8 px-4 text-center">
            <h1 className="text-2xl font-bold">No Friend Selected</h1>
            <p className="text-gray-400 mt-2">
              Please select a friend to view their profile.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      <Navigation />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto py-8 px-4">
          {/* Banner Section */}
          <div
            className={`w-full h-48 rounded-xl bg-gradient-to-r ${selectedFriend.bannerColor} mb-16 relative`}
          >
            {/* Profile Picture */}
            <div className="absolute -bottom-12 left-8">
              <div className="relative">
                <img
                  src={selectedFriend.imageUrl}
                  alt={selectedFriend.username}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gray-900"
                />
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* User Details Column */}
            <div className="md:w-1/3">
              <Card className="p-6 bg-gray-800/50 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700/50 h-full">
                <h2 className="text-2xl font-bold mb-2">
                  {selectedFriend.username}
                </h2>
                <p className="text-gray-400 mb-4">{selectedFriend.email}</p>

                <div className="border-t border-gray-700 my-4 pt-4">
                  <h3 className="text-xl font-semibold mb-2">Stats</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-700/50 p-3 rounded-lg">
                      <p className="text-gray-400 text-sm">Watched</p>
                      <p className="text-xl font-bold">
                        {selectedFriend.stats.watched}
                      </p>
                    </div>
                    <div className="bg-gray-700/50 p-3 rounded-lg">
                      <p className="text-gray-400 text-sm">Reviews</p>
                      <p className="text-xl font-bold">
                        {selectedFriend.stats.reviews}
                      </p>
                    </div>
                    <div className="bg-gray-700/50 p-3 rounded-lg">
                      <p className="text-gray-400 text-sm">Favorites</p>
                      <p className="text-xl font-bold">
                        {selectedFriend.stats.favorites}
                      </p>
                    </div>
                    <div className="bg-gray-700/50 p-3 rounded-lg">
                      <p className="text-gray-400 text-sm">Friends</p>
                      <p className="text-xl font-bold">
                        {selectedFriend.stats.friends}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Favorite Shows Column */}
            <div className="md:w-2/3">
              <Card className="p-6 bg-gray-800/50 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700/50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">Favorites</h3>
                  <button className="text-sm bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-full transition-colors">
                    View All
                  </button>
                </div>
                <UserFavorites />
              </Card>

              {/* Activity Feed */}
              <Card className="p-6 bg-gray-800/50 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700/50 mt-6">
                <h3 className="text-2xl font-bold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-3 border-b border-gray-700">
                    <img
                      src={selectedFriend.imageUrl}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p>
                        <span className="font-semibold">
                          {selectedFriend.username}
                        </span>{" "}
                        watched{" "}
                        <span className="text-purple-400">The Office</span>
                      </p>
                      <p className="text-sm text-gray-400">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pb-3 border-b border-gray-700">
                    <img
                      src={selectedFriend.imageUrl}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p>
                        <span className="font-semibold">
                          {selectedFriend.username}
                        </span>{" "}
                        added{" "}
                        <span className="text-purple-400">Breaking Bad</span> to
                        favorites
                      </p>
                      <p className="text-sm text-gray-400">3 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pb-3 border-b border-gray-700">
                    <img
                      src={selectedFriend.imageUrl}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p>
                        <span className="font-semibold">
                          {selectedFriend.username}
                        </span>{" "}
                        reviewed{" "}
                        <span className="text-purple-400">Inception</span>
                      </p>
                      <p className="text-sm text-gray-400">5 days ago</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FriendProfilePage;
