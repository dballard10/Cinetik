import Genre from "./Genre";
import { movie_genres, tv_genres, unified_genres } from "@/data/genres";

const GenreList = ({ media_type }: { media_type: string }) => {
  // Filter genres based on media_type
  let selectedGenres;
  if (media_type === "movie") {
    // Convert movie_genres to the format expected by Genre component
    selectedGenres = movie_genres.map((genre) => ({
      movieId: genre.id,
      tvId: 0,
      name: genre.name,
    }));
  } else if (media_type === "tv") {
    // Convert tv_genres to the format expected by Genre component
    selectedGenres = tv_genres.map((genre) => ({
      movieId: 0,
      tvId: genre.id,
      name: genre.name,
    }));
  } else {
    // unified_genres already has the correct format
    selectedGenres = unified_genres;
  }

  return (
    <div className="flex flex-col gap-2">
      {selectedGenres?.map((genre) => {
        return (
          <Genre
            key={genre.name}
            movieId={genre.movieId || 0}
            tvId={genre.tvId || 0}
            name={genre.name}
          />
        );
      })}
    </div>
  );
};

export default GenreList;
