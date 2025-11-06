import { Navigation } from "@/components/page-components/Navigation";
import MediaDetails from "@/components/media-details/MediaDetails";
import useMediaStore from "@/hooks/use-media-store";

const MediaDetailsPage = () => {
  const selectedShow = useMediaStore((state) => state.selectedShow);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      <Navigation />
      <main className="flex-1 overflow-hidden">
        <div className="h-full px-4 py-6 sm:px-6 lg:px-8 overflow-y-auto">
          <MediaDetails title={selectedShow?.name} />
        </div>
      </main>
    </div>
  );
};

export default MediaDetailsPage;
