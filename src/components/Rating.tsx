import { ThumbsUp, ThumbsDown } from "lucide-react";
type RatingProps = {
  rating: number;
};

const Rating = ({ rating }: RatingProps) => {
  const ratingValue = Math.round(rating);
  return (
    <div className="flex gap-2 h-7 text-black items-end">
      {ratingValue < 5 ? (
        <ThumbsDown className="w-5 h-5" />
      ) : (
        <ThumbsUp className="w-5 h-5" />
      )}
      <div className="self-end">{rating}</div>
    </div>
  );
};
export default Rating;
