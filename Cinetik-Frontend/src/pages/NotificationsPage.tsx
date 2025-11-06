import { Navigation } from "@/components/page-components/Navigation";
import { motion } from "framer-motion";
import {
  BellIcon,
  CheckCircleIcon,
  UserIcon,
  FilmIcon,
  TvIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export default function NotificationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white">
      <Navigation />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-3xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <BellIcon className="h-7 w-7 text-purple-400" />
              <h1 className="text-3xl font-bold">Notifications</h1>
            </div>
            <p className="text-gray-400">
              Stay updated with activity related to your account and content.
            </p>
          </header>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-1">
                    <div className="h-10 w-10 rounded-full bg-purple-800/30 flex items-center justify-center">
                      {notification.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{notification.content}</p>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                      <span>{notification.time}</span>
                      {notification.category && (
                        <>
                          <span>•</span>
                          <span>{notification.category}</span>
                        </>
                      )}
                    </div>
                  </div>
                  {notification.unread && (
                    <div className="shrink-0">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            <div className="text-center pt-4">
              <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                Load more notifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sample notifications data
const notifications = [
  {
    id: 1,
    content: "Morgan Freeman liked your review of Inception",
    time: "Just now",
    category: "Interaction",
    unread: true,
    icon: <HeartIcon className="h-5 w-5 text-pink-400" />,
  },
  {
    id: 2,
    content: "Interstellar is now available on Netflix",
    time: "2 hours ago",
    category: "Watchlist",
    unread: true,
    icon: <FilmIcon className="h-5 w-5 text-blue-400" />,
  },
  {
    id: 3,
    content: "Alex Johnson started following you",
    time: "Yesterday",
    category: "Social",
    unread: false,
    icon: <UserIcon className="h-5 w-5 text-green-400" />,
  },
  {
    id: 4,
    content: "New episode of Stranger Things is now available",
    time: "2 days ago",
    category: "Series Update",
    unread: false,
    icon: <TvIcon className="h-5 w-5 text-yellow-400" />,
  },
  {
    id: 5,
    content: "Your account has been verified",
    time: "1 week ago",
    category: "Account",
    unread: false,
    icon: <CheckCircleIcon className="h-5 w-5 text-green-400" />,
  },
];
