import { Heart } from "lucide-react";

type FavoriteCardHeaderProps = {
  title: string;
};

export const FavoriteCardHeader = ({ title }: FavoriteCardHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4 w-full">
      <h2 className="text-lg font-bold">{title}</h2>
      <Heart size={24} className="text-red-500" />
    </div>
  );
};
