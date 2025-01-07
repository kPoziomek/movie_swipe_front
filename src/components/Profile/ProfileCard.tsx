import { Heart, Star, ThumbsUp } from "lucide-react";
import { ProfileInfo, ProfileRow } from "./index.ts";
import GoBack from "../GoBack.tsx";
import { User } from "../../types.ts";

interface ProfileCardProps {
  user: User;
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="h-full">
      <GoBack />
      <div className="border h-[calc(100%-2rem)] rounded-lg p-6 shadow-lg max-w-sm mx-auto bg-white flex flex-col">
        <div className="flex flex-col items-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Avatar"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
          <p className="text-xs text-gray-600">{user?.email}</p>
        </div>
        <div className="p-5 flex w-full justify-between border-b">
          <ProfileInfo title="Followers" value="196" />
          <ProfileInfo title="Movies" value="19" />
          <ProfileInfo title="Reviews" value="96" />
        </div>
        <div className="mt-auto w-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b">
            My Movies
          </h3>
          <ul className="space-y-2 pt-2">
            <ProfileRow
              icon={<Heart className="text-red-500 mr-2" />}
              text="Favorites"
              votes={10}
            />
            <ProfileRow
              icon={<Star className="text-yellow-500 mr-2" />}
              text="Rated"
              votes={8}
            />
            <ProfileRow
              icon={<ThumbsUp className="text-blue-500 mr-2" />}
              text="Recommended"
              votes={15}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};
