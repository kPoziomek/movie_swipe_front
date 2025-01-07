import { useState, useEffect } from "react";
import { Movie } from "../types.ts";
import api from "../lib/axios.ts";

export const useFetchMovieById = (movieId: string) => {
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`movies/${movieId}`);
        setMovie(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch movie")
        );
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovie();
    }

    return () => {
      setMovie(undefined);
    };
  }, [movieId]);

  return { movie, loading, error };
};
