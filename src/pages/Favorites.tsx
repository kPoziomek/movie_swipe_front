import { FavoriteCard } from "../components/Favorites";
import GoBack from "../components/GoBack.tsx";
import api from "../lib/axios.ts";
import CardLoader from "../components/CardLoader.tsx";
import { toast } from "react-toastify";
import { useFetchFavorites } from "../hooks/useFetchFavorites.ts";

const Favorites = () => {
  const { favorites, loading, setFavorites } = useFetchFavorites();

  const removeFavorite = async (id: string) => {
    try {
      await api.delete(`movies/${id}/favorites`);
      setFavorites((prev) => prev.filter((favorite) => favorite.id !== id));
      toast.success("removing movie from favorites", {
        autoClose: 1000,
      });
    } catch (error: unknown) {
      console.log("Error removing movie from favorites:", error);
      toast.error("Error removing movie from favorites", {
        autoClose: 1000,
      });
    }
  };
  return (
    <>
      <div className="pb-3">
        <GoBack></GoBack>
      </div>
      <div className="flex flex-col justify-center">
        {loading && <CardLoader />}
        {favorites.map((favorite) => (
          <FavoriteCard
            key={favorite.id}
            title={favorite.title}
            summary={favorite.summary}
            image={favorite.imageUrl}
            removeFromFavorites={() => removeFavorite(favorite.id)}
          />
        ))}
      </div>
    </>
  );
};
export default Favorites;
