import useImages from "@/hooks/media-details/use-images";
interface ShowImagesProps {
  title: string;
  id: number;
  media_type: string;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const ShowImages = ({ title, id, media_type }: ShowImagesProps) => {
  const { data: images } = useImages(id, media_type);

  return (
    <div className="grid grid-cols-2 gap-3">
      {images?.data.backdrops.map((image, index) => (
        <img
          key={`${image.file_path}-${index}`}
          src={`${IMAGE_BASE_URL}${image.file_path}`}
          alt={title}
          className="rounded-lg"
        />
      ))}
    </div>
  );
};

export default ShowImages;
