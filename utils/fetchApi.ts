import { ApiImageConfig } from "./types";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const fetchApi = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}/${path}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

type ImagesPath = { backdrop_path: string; poster_path: string };
export const formatImagesInMovie = <T>({
  movie,
  apiImageConfig,
}: {
  movie: T & ImagesPath;
  apiImageConfig?: ApiImageConfig;
}): T => {
  const backdropSize =
    apiImageConfig?.backdrop_sizes?.find((item) => item === "original") ||
    apiImageConfig?.backdrop_sizes?.[0];

  const posterPathSize =
    apiImageConfig?.poster_sizes?.find((item) => item === "original") ||
    apiImageConfig?.backdrop_sizes?.[0];

  return {
    ...movie,
    backdrop_path: `${apiImageConfig?.secure_base_url}${backdropSize}/${movie.backdrop_path}`,
    poster_path: `${apiImageConfig?.secure_base_url}${posterPathSize}/${movie.poster_path}`,
  };
};
