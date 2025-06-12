import React from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import { Movie } from "../types";

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

const LoadingMessage = styled.div`
  width: 100%;
  text-align: center;
  padding: 2rem;
  grid-column: 1 / -1;
  color: #fff;
`;

const EmptyMessage = styled.div`
  width: 100%;
  text-align: center;
  padding: 2rem;
  grid-column: 1 / -1;
  color: #aaa;
`;

const MovieGrid: React.FC<MovieGridProps> = ({ movies, loading }) => {
  if (loading) {
    return <LoadingMessage>Loading movies...</LoadingMessage>;
  }

  if (movies.length === 0) {
    return (
      <EmptyMessage>
        No movies found. Try searching for something else.
      </EmptyMessage>
    );
  }

  return (
    <Grid>
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </Grid>
  );
};

export default MovieGrid;
