import { Navigation } from "@/components/page-components/Navigation";
import FriendsList from "@/components/friends/FriendsList";

const FriendsPage = () => {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      <Navigation />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Friends</h1>
          <FriendsList />
        </div>
      </main>
    </div>
  );
};

export default FriendsPage;
