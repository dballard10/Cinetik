const Runtime = ({ runtime }: { runtime: number }) => {
  return (
    <div className="text-sm text-gray-400 mt-1">
      {runtime ? `${runtime} min` : ""}
    </div>
  );
};

export default Runtime;
