import defaultImage from "@/assets/default-profile-pic.webp";
import { TbChevronRight } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import useFriendStore from "@/hooks/use-friend-store";

interface FriendProps {
  username: string;
  avatar?: string;
}

const Friend = ({ username, avatar }: FriendProps) => {
  const navigate = useNavigate();
  const { setSelectedFriend } = useFriendStore();

  const handleFriendClick = () => {
    // Set friend data in store
    setSelectedFriend({
      id: Math.floor(Math.random() * 1000), // Generate a random ID for demo
      username: username,
      email: `${username.toLowerCase().replace(" ", "")}@example.com`,
      imageUrl: avatar || defaultImage,
      bannerColor: "from-green-600 to-teal-800", // You can randomize this or get from API
      stats: {
        watched: Math.floor(Math.random() * 50) + 10,
        reviews: Math.floor(Math.random() * 20) + 5,
        favorites: Math.floor(Math.random() * 30) + 5,
        friends: Math.floor(Math.random() * 40) + 10,
      },
    });

    // Navigate to friend profile
    navigate(`/friends/${username}`);
  };

  return (
    <button
      onClick={handleFriendClick}
      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors group w-full text-left"
    >
      <div className="flex items-center gap-3">
        <img
          src={avatar || defaultImage}
          alt={username}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-medium">{username}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-gray-400 group-hover:text-white px-2 py-1 rounded transition-colors">
          <TbChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
        </div>
      </div>
    </button>
  );
};

export default Friend;
