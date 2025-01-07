import React, { useState, useEffect } from "react";
import { useSprings, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import styles from "./syles.module.css";
import { useSwipeable } from "react-swipeable";
import { toast } from "react-toastify";
import { DeckHeader } from "./DeckHeader.tsx";
import DeckButtons from "./DeckButtons.tsx";
import axiosApi from "../lib/axios.ts";
import { Movie } from "../types.ts";

const PAGE_SIZE = 5;
const to = (i: number) => ({
  x: 0,
  y: 0,
  scale: 0,
  rot: 0,
  delay: i * 100,
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });

export const Deck = () => {
  const [, setAllMovies] = useState<Movie[]>([]);
  const [currentMovies, setCurrentMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMovies = async (pageNum: number) => {
    setLoading(true);
    try {
      const { data } = await axiosApi.get(
        `/movies?page=${pageNum}&limit=${PAGE_SIZE}`
      );
      setAllMovies((prev) => [...prev, ...data]);
      setCurrentMovies((prev) => [...prev, ...data]);
    } catch (error: unknown) {
      console.error("Failed to fetch movies:", error);
      toast.error("Failed to fetch movies");
    }
    setLoading(false);
  };

  const [gone] = useState(() => new Set());
  const [props, api] = useSprings(currentMovies.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  useEffect(() => {
    if (currentMovies.length - gone.size <= 3) {
      loadMovies(page + 1);
      setPage((prev) => prev + 1);
    }
  }, [gone.size]);

  const bind = useDrag(
    async ({
      args: [index],
      active,
      movement: [mx],
      direction: [xDir],
      velocity: [vx],
    }) => {
      const trigger = vx > 0.2;

      if (!active && trigger) {
        gone.add(index);

        try {
          const type = xDir > 0 ? "LIKE" : "REJECT";
          const movieId = currentMovies[index].id;

          await axiosApi.post(`/movies/${movieId}/interact`, { type });
          toast.info(xDir > 0 ? "Movie added to favorites" : "Movie rejected");
        } catch (error: unknown) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          if (error.response?.status === 409) {
            toast.info(
              xDir > 0
                ? "This movie is already in your favorites!"
                : "You already rejected this movie"
            );
          } else {
            toast.error("Something went wrong???");
            console.error("Failed to save interaction:", error);
          }
        }
      }
      api.start((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0;
        const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0);
        const scale = active ? 1.1 : 1;

        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
        };
      });
    }
  );

  const handleButtonAction = (index: number, direction: 1 | -1) => {
    gone.add(index);
    api.start((i) => {
      if (index !== i) return;

      const x = (200 + window.innerWidth) * direction;
      const rot = direction * 10; // Rotacja

      return {
        x,
        rot,
        scale: 1,
        delay: undefined,
        config: { friction: 50, tension: 200 },
      };
    });
  };

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    i: number,
    movieId: string
  ) => {
    e.stopPropagation();

    try {
      await axiosApi.post(`/movies/${movieId}/interact`, { type: "LIKE" });
      handleButtonAction(i, 1);
      toast.success("Movie added to favorites", {
        autoClose: 1000,
      });
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (error.response?.status === 409) {
        toast.info("This movie is already in your favorites!");
        handleButtonAction(i, 1);
      }
    }
  };
  const handleReject = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    i: number,
    movieId: string
  ) => {
    e.stopPropagation();
    try {
      handleButtonAction(i, -1);
      await axiosApi.post(`/movies/${movieId}/interact`, { type: "REJECT" });
      toast.error("Movie rejected", {
        autoClose: 1000,
      });
    } catch (e) {
      console.error("Error removing movie to favorites:", e);
      toast.error("Failed to reject movie");
    }
  };

  const handlers = useSwipeable({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    onSwipedLeft: handleReject,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    onSwipedRight: handleLike,
    trackMouse: true,
  });

  const handleLoadMore = () => {
    if (!loading) {
      loadMovies(page + 1);
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="flex fill center" {...handlers}>
        {/* eslint-disable-next-line react/prop-types */}
        {props.map(({ x, y }, i) => (
          <animated.div className={styles.deck} key={i} style={{ x, y }}>
            <animated.div
              {...bind(i)}
              style={{
                backgroundImage: `url(${currentMovies[i].imageUrl})`,
              }}
            >
              <DeckHeader
                title={currentMovies[i].title}
                rating={currentMovies[i].rating}
              />
              <DeckButtons
                handleReject={(
                  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => handleReject(e, i, currentMovies[i].id)}
                handleLike={(
                  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => handleLike(e, i, currentMovies[i].id)}
                id={currentMovies[i].id}
              />
            </animated.div>
          </animated.div>
        ))}
        {currentMovies.length > 0 && (
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="mt-4 px-4 py-2 border text-gray-500 rounded"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </>
  );
};
