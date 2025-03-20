import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthState, User } from "../types";

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    token: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const user = JSON.parse(userData) as User;
        setAuthState({
          user,
          isAuthenticated: true,
          token,
        });
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === "user@example.com" && password === "password") {
          const user: User = {
            id: "1",
            email,
            name: "Demo User",
          };
          const token = "mock-jwt-token";

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          setAuthState({
            user,
            isAuthenticated: true,
            token,
          });
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthState({
      user: null,
      isAuthenticated: false,
      token: null,
    });
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: "2",
          email,
          name,
        };
        const token = "mock-jwt-token";

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setAuthState({
          user,
          isAuthenticated: true,
          token,
        });
        resolve(true);
      }, 500);
    });
  };

  const value = {
    authState,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
