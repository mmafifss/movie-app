import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Movie } from "../types";

interface MovieCardProps {
  movie: Movie;
}

const Card = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  background-color: #181818;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const PosterContainer = styled.div`
  width: 100%;
  height: 0;
  padding-top: 150%; /* 2:3 aspect ratio */
  position: relative;
  overflow: hidden;
`;

const Poster = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NoImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #2c2c2c;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 1rem;
  text-align: center;
  padding: 1rem;
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Year = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: #aaa;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const validPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <Card>
      <StyledLink to={`/movie/${movie.imdbID}`}>
        <PosterContainer>
          {validPoster ? (
            <Poster src={movie.Poster} alt={`${movie.Title} poster`} />
          ) : (
            <NoImage>No Image Available</NoImage>
          )}
        </PosterContainer>
        <CardContent>
          <Title>{movie.Title}</Title>
          <Year>{movie.Year}</Year>
        </CardContent>
      </StyledLink>
    </Card>
  );
};

export default MovieCard;
