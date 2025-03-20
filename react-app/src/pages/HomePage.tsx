import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { searchMovies } from "../services/api";
import { Movie } from "../types";

const HomeContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #fff;
`;

const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const fetchMovies = async (query: string, page: number) => {
    if (!query) {
      setMovies([]);
      setTotalResults(0);
      return;
    }

    setLoading(true);
    const { movies, totalResults } = await searchMovies(query, page);
    setMovies(movies);
    setTotalResults(totalResults);
    setLoading(false);
  };

  useEffect(() => {
    if (searchQuery) {
      fetchMovies(searchQuery, currentPage);

      setSearchParams({
        q: searchQuery,
        page: currentPage.toString(),
      });
    }
  }, [searchQuery, currentPage]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(totalResults / 10); // OMDb API returns 10 results per page

  return (
    <HomeContainer>
      <Title>Discover Movies</Title>
      <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />

      <MovieGrid movies={movies} loading={loading} />

      {totalResults > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </HomeContainer>
  );
};

export default HomePage;
