import useMediaStore from "@/hooks/use-media-store";

interface GenreProps {
  movieId: number;
  tvId: number;
  name: string;
}

const Genre = ({ movieId, tvId, name }: GenreProps) => {
  const { addSelectedGenre, removeSelectedGenre, selectedGenres } =
    useMediaStore();

  const isSelected = selectedGenres.names.includes(name);

  const handleGenreClick = () => {
    if (isSelected) {
      removeSelectedGenre(movieId, tvId, name);
    } else {
      addSelectedGenre(movieId, tvId, name);
    }
  };

  return (
    <div>
      <button
        className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-2 w-full
          ${isSelected ? "bg-white/30 font-medium" : ""}`}
        onClick={() => handleGenreClick()}
      >
        {name}
      </button>
    </div>
  );
};

export default Genre;
