interface CardSkeletonsProps {
  numOfSkeletons?: number;
}

const CardSkeletons = ({ numOfSkeletons = 20 }: CardSkeletonsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: numOfSkeletons }).map((_, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg overflow-hidden"
        >
          {/* Image skeleton */}
          <div className="bg-gray-700/50 animate-pulse h-48 w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default CardSkeletons;
