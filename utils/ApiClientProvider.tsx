import React, { PropsWithChildren, createContext, useContext } from "react";
import {
  ApiConfigResponse,
  Genre,
  GenreResponse,
  MovieCategory,
  MoviesResponse,
} from "./types";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "./fetchApi";

interface ApiClientProviderProps {}
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

type FetchMovieResponse = Promise<{
  data: MoviesResponse | undefined;
  nextPage: number | null;
}>;
const ApiClientContext = createContext<{
  fetchMovies: (params: MovieCategory, page: number) => FetchMovieResponse;
  configLoading: boolean;
}>({
  fetchMovies: () => Promise.resolve({ data: undefined, nextPage: 1 }),
  configLoading: false,
});

export const ApiClientProvider: React.FC<
  PropsWithChildren<ApiClientProviderProps>
> = ({ children }) => {
  const { data: configData, isLoading: configLoading } = useQuery({
    queryKey: ["apiConfig"],
    queryFn: () => fetchApi<ApiConfigResponse>("configuration"),
  });

  const { data: genreData, isLoading: genreLoading } = useQuery({
    queryKey: ["genre"],
    queryFn: () => fetchApi<GenreResponse>("genre/movie/list"),
  });

  const apiImageConfig = configData?.images;

  const fetchMovies = async (
    category: MovieCategory,
    page: number
  ): FetchMovieResponse => {
    const movies = await fetchApi<MoviesResponse>(
      `movie/${category}?language=en-US&page=${page}`
    );

    const backdropSize =
      apiImageConfig?.backdrop_sizes?.find((item) => item === "original") ||
      apiImageConfig?.backdrop_sizes?.[0];

    const posterPathSize =
      apiImageConfig?.poster_sizes?.find((item) => item === "original") ||
      apiImageConfig?.backdrop_sizes?.[0];

    const nextPage = movies.page < movies.total_pages ? movies.page + 1 : null;

    return {
      data: {
        ...movies,
        results: movies?.results.map((item) => ({
          ...item,
          backdrop_path: `${apiImageConfig?.secure_base_url}${backdropSize}/${item.backdrop_path}`,
          poster_path: `${apiImageConfig?.secure_base_url}${posterPathSize}/${item.poster_path}`,
          genres: genreData?.genres?.filter((gr) =>
            item.genre_ids.includes(gr.id)
          ),
        })),
      },
      nextPage,
    };
  };

  return (
    <ApiClientContext.Provider
      value={{ fetchMovies, configLoading: configLoading || genreLoading }}
    >
      {children}
    </ApiClientContext.Provider>
  );
};

export const useApiClent = () => useContext(ApiClientContext);
