import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MovieGrid from "../components/MovieGrid";
import { Movie } from "../types";

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #fff;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #aaa;
`;

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = () => {
      setLoading(true);

      setTimeout(() => {
        const demoFavorites: Movie[] = [
          {
            imdbID: "tt0111161",
            Title: "The Shawshank Redemption",
            Year: "1994",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
            Type: "movie",
          },
          {
            imdbID: "tt0068646",
            Title: "The Godfather",
            Year: "1972",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
            Type: "movie",
          },
        ];

        setFavorites(demoFavorites);
        setLoading(false);
      }, 1000);
    };

    loadFavorites();
  }, []);

  return (
    <Container>
      <Title>Your Favorites</Title>
      {favorites.length === 0 && !loading ? (
        <EmptyMessage>You haven't added any favorites yet.</EmptyMessage>
      ) : (
        <MovieGrid movies={favorites} loading={loading} />
      )}
    </Container>
  );
};

export default FavoritesPage;
