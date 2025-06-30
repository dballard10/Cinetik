import Rating from "./Rating";
import FavoritesButton from "../card-components/FavoritesButton";
import MediaImages from "./Images";
import MediaType from "../card-components/MediaType";
import MediaTrailer from "./Trailer";
import Overview from "./Overview";
import ReleaseDate from "./ReleaseDate";
import MediaGenres from "./MediaGenres";
import MediaProductionCompanies from "./MediaProductionCompanies";
import MediaProviders from "./MediaProviders";
import Separator from "../page-components/Separator";
import WatchedButton from "../card-components/WatchedButton";
import useMediaStore from "@/hooks/use-media-store";
import Runtime from "./Runtime";

const MediaDetails = ({ title }: { title: string }) => {
  const selectedShow = useMediaStore((state) => state.selectedShow);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 h-full">
      <div className="bg-gray-900 rounded-lg p-4 max-h-full overflow-y-auto">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="flex gap-2 pb-2 justify-between">
          <div className="flex gap-4 items-center">
            <MediaType media_type={selectedShow.media_type} />
            <ReleaseDate release_date={selectedShow.release_date} />
            <Runtime runtime={selectedShow.runtime} />
          </div>
          <div className="flex gap-2">
            <Rating rating={selectedShow.vote_average} />
            <WatchedButton media={selectedShow} />
            <FavoritesButton media={selectedShow} />
          </div>
        </div>
        <Overview overview={selectedShow.overview} />
        <Separator />
        <div className="flex flex-col sm:flex-row gap-24 justify-center">
          <MediaGenres genres={selectedShow.genres} />
          <MediaProviders
            id={selectedShow.id}
            media_type={selectedShow.media_type}
          />
          <MediaProductionCompanies
            production_companies={selectedShow.production_companies}
          />
        </div>
      </div>
      <div className="bg-gray-900 rounded-lg p-4 flex flex-col gap-4 max-h-full overflow-y-auto">
        <div className="flex flex-col gap-4">
          <MediaTrailer
            id={selectedShow.id}
            media_type={selectedShow.media_type}
            title={selectedShow.name}
          />
          <Separator />
          <MediaImages
            id={selectedShow.id}
            media_type={selectedShow.media_type}
            title={selectedShow.name}
          />
        </div>
      </div>
    </div>
  );
};

export default MediaDetails;
