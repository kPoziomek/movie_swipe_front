export const MovieRating = ({ rating }: { rating: number }) => {
  return (
    <div className="absolute top-1 left-2 bg-black bg-opacity-50 text-white px-2 py-1">
      {rating}
    </div>
  );
};
