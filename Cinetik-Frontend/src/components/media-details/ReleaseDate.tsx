const ReleaseDate = ({ release_date }: { release_date: string }) => {
  // Format date to month/day/year
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="text-sm text-gray-400 mt-1">{formatDate(release_date)}</div>
  );
};

export default ReleaseDate;
