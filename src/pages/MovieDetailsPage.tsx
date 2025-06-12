import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import { getMovieById } from "../services/api";
import { MovieDetails } from "../types";

const Container = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2rem;
  color: #aaa;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #e50914;
  }
`;

const Content = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PosterContainer = styled.div`
  flex: 0 0 300px;

  @media (max-width: 768px) {
    max-width: 300px;
    margin: 0 auto;
  }
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const NoPoster = styled.div`
  width: 100%;
  height: 450px;
  background-color: #2c2c2c;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  text-align: center;
  padding: 1rem;
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  margin: 0 0 0.5rem;
  color: #fff;
`;

const Year = styled.span`
  color: #aaa;
  font-size: 1.25rem;
  font-weight: normal;
`;

const Rating = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    color: #ffc107;
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

const InfoItem = styled.div`
  margin: 0.5rem 0;

  strong {
    color: #ddd;
    margin-right: 0.5rem;
  }

  span {
    color: #aaa;
  }
`;

const Plot = styled.p`
  margin: 1.5rem 0;
  line-height: 1.6;
  color: #ccc;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #aaa;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #e50914;
`;

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const movieData = await getMovieById(id);
        if (movieData) {
          setMovie(movieData);
        } else {
          setError("Movie not found");
        }
      } catch (err) {
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <LoadingMessage>Loading movie details...</LoadingMessage>
      </Container>
    );
  }

  if (error || !movie) {
    return (
      <Container>
        <BackLink to="/">← Back to search</BackLink>
        <ErrorMessage>{error || "Movie not found"}</ErrorMessage>
      </Container>
    );
  }

  const validPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <Container>
      <BackLink to="/">← Back to search</BackLink>

      <Content>
        <PosterContainer>
          {validPoster ? (
            <Poster src={movie.Poster} alt={`${movie.Title} poster`} />
          ) : (
            <NoPoster>No image available</NoPoster>
          )}
        </PosterContainer>

        <InfoContainer>
          <Title>
            {movie.Title} <Year>({movie.Year})</Year>
          </Title>

          <Rating>
            <span>★</span> {movie.imdbRating} / 10
          </Rating>

          <InfoItem>
            <strong>Released:</strong>
            <span>{movie.Released}</span>
          </InfoItem>

          <InfoItem>
            <strong>Runtime:</strong>
            <span>{movie.Runtime}</span>
          </InfoItem>

          <InfoItem>
            <strong>Genre:</strong>
            <span>{movie.Genre}</span>
          </InfoItem>

          <InfoItem>
            <strong>Director:</strong>
            <span>{movie.Director}</span>
          </InfoItem>

          <InfoItem>
            <strong>Actors:</strong>
            <span>{movie.Actors}</span>
          </InfoItem>

          <Plot>{movie.Plot}</Plot>

          <Button primary>Add to Favorites</Button>
        </InfoContainer>
      </Content>
    </Container>
  );
};

export default MovieDetailsPage;
