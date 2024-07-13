import React, { PropsWithChildren, createContext, useContext } from "react";
import { ApiConfigResponse, MovieCategory, MoviesResponse } from "./types";
import { useQuery } from "@tanstack/react-query";

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
  const fetchConfig = async (): Promise<ApiConfigResponse> => {
    const response = await fetch(`${BASE_URL}/configuration`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["apiConfig"],
    queryFn: fetchConfig,
  });

  const apiImageConfig = data?.images;

  const fetchMovies = async (
    category: MovieCategory,
    page: number
  ): FetchMovieResponse => {
    const response = await fetch(
      `${BASE_URL}/movie/${category}?language=en-US&page=${page}';`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const jsonResponse: MoviesResponse = await response.json();
    const backdropSize =
      apiImageConfig?.backdrop_sizes?.find((item) => item === "original") ||
      apiImageConfig?.backdrop_sizes?.[0];

    const posterPathSize =
      apiImageConfig?.poster_sizes?.find((item) => item === "original") ||
      apiImageConfig?.backdrop_sizes?.[0];

    const nextPage =
      jsonResponse.page < jsonResponse.total_pages
        ? jsonResponse.page + 1
        : null;

    return {
      data: {
        ...jsonResponse,
        results: jsonResponse?.results.map((item) => ({
          ...item,
          backdrop_path: `${apiImageConfig?.secure_base_url}${backdropSize}/${item.backdrop_path}`,
          poster_path: `${apiImageConfig?.secure_base_url}${posterPathSize}/${item.poster_path}`,
        })),
      },
      nextPage,
    };
  };

  return (
    <ApiClientContext.Provider
      value={{ fetchMovies, configLoading: isLoading }}
    >
      {children}
    </ApiClientContext.Provider>
  );
};

export const useApiClent = () => useContext(ApiClientContext);
