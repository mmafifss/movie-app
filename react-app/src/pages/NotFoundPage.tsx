import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";

const Container = styled.div`
  padding: 4rem 2rem;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #e50914;
`;

const Message = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: #aaa;
`;

const HomeButton = styled(Button)`
  display: inline-block;
`;

const NotFoundPage: React.FC = () => {
  return (
    <Container>
      <Title>404</Title>
      <Message>The page you're looking for doesn't exist.</Message>
      <Link to="/">
        <HomeButton primary>Go to Homepage</HomeButton>
      </Link>
    </Container>
  );
};

export default NotFoundPage;
