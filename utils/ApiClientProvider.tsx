import React, { PropsWithChildren, createContext, useContext } from "react";
import {
  ApiConfigResponse,
  GenreResponse,
  MovieListItem,
  MovieCategory,
  MoviesResponse,
  MovieDetail,
} from "./types";
import { useQuery } from "@tanstack/react-query";
import { fetchApi, formatImagesInMovie } from "./fetchApi";

interface ApiClientProviderProps {}

type FetchMovieResponse = Promise<{
  data: MoviesResponse | undefined;
  nextPage: number | null;
}>;

type fetchMovieDetails = Promise<MovieDetail | undefined>;
const ApiClientContext = createContext<{
  fetchMovies: (params: MovieCategory, page: number) => FetchMovieResponse;
  fetchMovieDetails: (id: string) => fetchMovieDetails;
  configLoading: boolean;
}>({
  fetchMovies: () => Promise.resolve({ data: undefined, nextPage: 1 }),
  fetchMovieDetails: () => Promise.resolve(undefined),
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
    const nextPage = movies.page < movies.total_pages ? movies.page + 1 : null;

    return {
      data: {
        ...movies,
        results: movies?.results.map((m) => ({
          ...formatImagesInMovie<MovieListItem>({
            movie: m,
            apiImageConfig: configData?.images,
          }),
          genres: genreData?.genres?.filter((gr) =>
            m.genre_ids.includes(gr.id)
          ),
        })),
      },
      nextPage,
    };
  };

  const fetchMovieDetails = async (id: string) => {
    const movie = await fetchApi<MovieDetail>(`movie/${id}`);

    return formatImagesInMovie<MovieDetail>({ movie, apiImageConfig });
  };
  return (
    <ApiClientContext.Provider
      value={{
        fetchMovies,
        fetchMovieDetails,
        configLoading: configLoading || genreLoading,
      }}
    >
      {children}
    </ApiClientContext.Provider>
  );
};

export const useApiClent = () => useContext(ApiClientContext);
