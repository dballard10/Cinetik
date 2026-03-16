import useVideos from "@/hooks/media-details/use-videos";

interface MediaTrailerProps {
  title: string;
  id: number | undefined;
  media_type: string | undefined;
}

const MediaTrailer = ({ title, id, media_type }: MediaTrailerProps) => {
  const { data: videos } = useVideos(id, media_type);

  // Find the first trailer, teaser, or any video if those aren't available
  const trailer =
    videos?.data.results.find((video) => video.type === "Trailer") ||
    videos?.data.results.find((video) => video.type === "Teaser") ||
    videos?.data.results[0];

  if (!trailer) {
    return <div className="text-center py-10">No trailer available</div>;
  }

  return (
    <div className="aspect-video w-full">
      <iframe
        className="w-full h-full rounded-lg"
        src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
        title={`${title} Trailer`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MediaTrailer;
