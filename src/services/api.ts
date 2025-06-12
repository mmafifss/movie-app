import { Movie, MovieDetails } from "../types";

const API_KEY = "ebba0b34";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<{ movies: Movie[]; totalResults: number }> => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(
        query
      )}&page=${page}`
    );
    const data = await response.json();

    if (data.Response === "True") {
      return {
        movies: data.Search,
        totalResults: parseInt(data.totalResults, 10),
      };
    }
    return { movies: [], totalResults: 0 };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { movies: [], totalResults: 0 };
  }
};

export const getMovieById = async (
  id: string
): Promise<MovieDetails | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`
    );
    const data = await response.json();

    if (data.Response === "True") {
      return data as MovieDetails;
    }
    return null;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
