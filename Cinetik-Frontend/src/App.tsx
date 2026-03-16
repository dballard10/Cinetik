import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import MediaDetailsPage from "./pages/MediaDetailsPage";
import ContentPage from "./pages/ContentPage";

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
          <Route path="/media/:id" element={<MediaDetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    <ReactQueryDevtools></ReactQueryDevtools>
  </QueryClientProvider>
);

export default App;
