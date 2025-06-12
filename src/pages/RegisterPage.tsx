import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../contexts/AuthContext";

const Container = styled.div`
  padding: 2rem;
  max-width: 400px;
  margin: 2rem auto;
`;

const FormContainer = styled.div`
  background-color: #232323;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #fff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled(Button)`
  margin-top: 1rem;
  width: 100%;
`;

const ErrorMessage = styled.div`
  color: #e50914;
  margin-bottom: 1rem;
  text-align: center;
`;

const LoginLink = styled.div`
  margin-top: 1rem;
  text-align: center;
  color: #aaa;

  a {
    color: #e50914;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const success = await register(name, email, password);
      if (success) {
        navigate("/");
      } else {
        setError("Registration failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Register</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
            required
          />

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            required
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            required
          />

          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirm Password"
            required
          />

          <SubmitButton primary type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </SubmitButton>
        </Form>

        <LoginLink>
          Already have an account? <Link to="/login">Login</Link>
        </LoginLink>
      </FormContainer>
    </Container>
  );
};

export default RegisterPage;
