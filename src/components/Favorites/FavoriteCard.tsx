import { FavoriteCardHeader } from "./index.ts";

type FavoriteCardProps = {
  image: string;
  title: string;
  summary: string;
  removeFromFavorites: () => void;
};

export const FavoriteCard = ({
  image,
  title,
  summary,
  removeFromFavorites,
}: FavoriteCardProps) => {
  return (
    <div className="flex flex-col border rounded-lg p-4 shadow-md max-w-[500px]">
      <FavoriteCardHeader title={title} />
      <div className="flex gap-2">
        <img
          src={image}
          alt={title}
          className="h-48 rounded-lg object-cover mx-auto flex-1"
        />
        <p className="text-sm text-gray-600 self-start flex-shrink">
          {summary}
        </p>
      </div>
      <button
        onClick={removeFromFavorites}
        className="mt-4 self-end bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
};
