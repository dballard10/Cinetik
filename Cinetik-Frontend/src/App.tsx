import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import SettingsPage from "./pages/SettingsPage";
import MediaDetailsPage from "./pages/MediaDetailsPage";
import ContentPage from "./pages/ContentPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import FriendsPage from "./pages/FriendsPage";
import FriendProfilePage from "./pages/FriendProfilePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ContentPage pageName="discover" />} />
          <Route path="/movies" element={<ContentPage pageName="movies" />} />
          <Route path="/series" element={<ContentPage pageName="series" />} />
          <Route path="/library" element={<ContentPage pageName="library" />} />
          <Route path="/social" element={<ContentPage pageName="social" />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/media/:id" element={<MediaDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route
            path="/friends/:username"
            element={<FriendProfilePage username="username" />}
          />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    <ReactQueryDevtools></ReactQueryDevtools>
  </QueryClientProvider>
);

export default App;
