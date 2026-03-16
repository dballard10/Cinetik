interface RatingProps {
  rating: number;
}

const Rating = ({ rating }: RatingProps) => {
  // Round to the nearest tenth (one decimal place) and ensure display with one decimal place
  const roundedRating = (Math.round(rating * 10) / 10).toFixed(1);

  let backgroundColor: string;
  if (rating > 8) {
    backgroundColor = "lightgreen";
  } else if (rating >= 5) {
    backgroundColor = "lightblue";
  } else {
    backgroundColor = "lightyellow";
  }

  return (
    <div
      className="inline-flex items-center justify-center rounded-full text-sm font-medium"
      style={{
        borderRadius: "10px",
        padding: "10px",
        height: "35px",
        width: "35px",
        backgroundColor,
        fontWeight: "bold",
        fontSize: "0.875rem",
        color: "#333",
        marginTop: "7px",
        border: "2px solid #333",
      }}
    >
      {roundedRating}
    </div>
  );
};

export default Rating;
