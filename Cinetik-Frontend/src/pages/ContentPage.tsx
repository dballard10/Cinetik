import { Navigation } from "@/components/page-components/Navigation";
import AsidePanel from "@/components/page-components/AsidePanel";
import useToggleAside from "@/hooks/screen/use-toggleAside";
import DiscoverContent from "@/components/page-components/media-content/DiscoverContent";
import MovieContent from "@/components/page-components/media-content/MovieContent";
import SeriesContent from "@/components/page-components/media-content/SeriesContent";
import SocialContent from "@/components/page-components/media-content/SocialContent";
import LibraryContent from "@/components/page-components/media-content/LibraryContent";

interface ContentPageProps {
  pageName: string;
}

const ContentPage = ({ pageName }: ContentPageProps) => {
  const { isCollapsed, toggleCollapse } = useToggleAside({
    initialState: true,
  });

  return (
    <div className="h-screen max-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      <Navigation />
      <div className="absolute top-20 pt-2 left-8">
        {pageName !== "library" && pageName !== "social" && (
          <AsidePanel
            isCollapsed={isCollapsed}
            toggleCollapse={toggleCollapse}
          />
        )}
      </div>
      <main className="relative flex-1 overflow-x-hidden">
        <div className="px-6 py-6">
          <div className="flex flex-col gap-4">
            {pageName === "discover" && <DiscoverContent />}
            {pageName === "movies" && <MovieContent />}
            {pageName === "series" && <SeriesContent />}
            {pageName === "social" && <SocialContent />}
            {pageName === "library" && <LibraryContent />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentPage;
