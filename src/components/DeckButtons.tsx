import { CircleEllipsis, Heart, X } from "lucide-react";
import { useNavigate } from "react-router";
type DeckButtonsProps = {
  handleReject: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleLike: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  id: string;
};

const DeckButtons = ({ handleReject, handleLike, id }: DeckButtonsProps) => {
  const navigate = useNavigate();
  return (
    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-8">
      <button
        type="button"
        onClick={handleReject}
        className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg"
      >
        <X className="w-8 h-8 text-red-500" />
      </button>
      <button
        onClick={() => navigate(`/movie/${id}`)}
        className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg"
      >
        <CircleEllipsis className="w-8 h-8 text-black" />
      </button>
      <button
        onClick={handleLike}
        className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg"
      >
        <Heart className="w-8 h-8 text-pink-500" />
      </button>
    </div>
  );
};
export default DeckButtons;
