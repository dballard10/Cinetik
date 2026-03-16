interface MediaGenresProps {
  genres: { id: number; name: string }[];
}

const MediaGenres = ({ genres }: MediaGenresProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-md font-semibold">Genres</h1>
      {genres.map((genre) => (
        <div key={genre.id} className="text-sm text-gray-400 mt-1">
          {genre.name}
        </div>
      ))}
    </div>
  );
};

export default MediaGenres;
