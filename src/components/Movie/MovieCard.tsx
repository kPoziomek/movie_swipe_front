import CardLoader from "../CardLoader.tsx";
import GoBack from "../GoBack.tsx";
import { MovieRating } from "./index.ts";
import { useParams } from "react-router";
import { useFetchMovieById } from "../../hooks/useFetchMovieById.ts";

export const MovieCard = () => {
  const { id } = useParams<{ id: string }>();

  const { movie, loading, error } = useFetchMovieById(id!);

  if (loading) {
    return <CardLoader />;
  }

  return (
    <div className="h-full">
      <GoBack />
      {movie && (
        <div className="bg-white border rounded-lg shadow-lg overflow-hidden h-[calc(100%-4rem)] mt-4 max-w-sm mx-auto">
          <div className="relative rounded-lg">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="h-72 w-full object-contain object-center rounded-t-lg"
            />
            <MovieRating rating={movie.rating} />
          </div>
          <div className="p-4">
            <h2 className="text-2xl font-semibold">{movie.title}</h2>
            <p className="text-gray-500">{movie.summary}</p>
          </div>
        </div>
      )}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};
