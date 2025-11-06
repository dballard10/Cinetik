import useWatchProviders from "@/hooks/use-watch-providers";

const MediaProviders = ({
  id,
  media_type,
}: {
  id: number;
  media_type: string;
}) => {
  const { data: providers } = useWatchProviders(id, media_type);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-md font-semibold">Watch Providers</h1>
      {providers &&
        providers.map((provider) => (
          <div
            key={provider.id}
            className="text-sm text-gray-400 mt-1 flex items-center gap-2"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${provider.logo_path}`}
              alt={provider.provider_name}
              className="w-5 h-5 rounded-md"
            />
            {provider.provider_name}
          </div>
        ))}
    </div>
  );
};

export default MediaProviders;
