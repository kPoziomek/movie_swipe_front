import Rating from "./Rating.tsx";
type DeckHeaderProps = {
  title: string;
  rating: number;
};

export const DeckHeader = ({ title, rating }: DeckHeaderProps) => {
  return (
    <div className="">
      <div className=" absolute text-lg top-1 left-2">{title}</div>
      <div className="absolute top-1 right-2">
        <Rating rating={rating} />
      </div>
    </div>
  );
};
