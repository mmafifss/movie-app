import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";

const Nav = styled.nav`
  background-color: #141414;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled(Link)`
  color: #e50914;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 0.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: #e50914;
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding: 0.5rem;

  &:hover {
    color: #e50914;
  }
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #232323;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 0.5rem 0;
  min-width: 150px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  z-index: 10;
`;

const DropdownItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

const Navbar: React.FC = () => {
  const { authState, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <Nav>
      <Logo to="/">MovieFlix</Logo>
      <NavItems>
        {authState.isAuthenticated ? (
          <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>
            <UserMenu>
              <UserButton onClick={() => setMenuOpen(!menuOpen)}>
                {authState.user?.name || "User"} ▼
              </UserButton>
              <Dropdown isOpen={menuOpen}>
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </Dropdown>
            </UserMenu>
          </>
        ) : (
          <>
            <NavLink to="/login">
              <Button>Login</Button>
            </NavLink>
            <NavLink to="/register">
              <Button primary>Register</Button>
            </NavLink>
          </>
        )}
      </NavItems>
    </Nav>
  );
};

export default Navbar;
