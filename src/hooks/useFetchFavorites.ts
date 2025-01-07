import { useEffect, useState } from "react";
import { Movie } from "../types.ts";
import api from "../lib/axios.ts";

export const useFetchFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [page] = useState(1);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`movies/favorites`, {
          params: {
            page,
            limit: 10,
          },
        });
        setFavorites((prev) => [...prev, ...data]);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Error fetching favorites")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();

    return () => {
      setFavorites([]);
    };
  }, []);

  return { favorites, loading, page, error, setFavorites };
};
