import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { User } from "../../models/user";

interface AuthContextProps {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getProfile: () => Promise<User>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("token"));

  useEffect(() => {
    const fetchProfileOnInit = async () => {
      setToken(localStorage.getItem("token"));

      if (token) {
        try {
          await axios.get("http://localhost:8080/api/usuarios/my-profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token inválido ou expirado:", error);
          logout();
        }
      }
    };

    fetchProfileOnInit();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:8080/api/usuarios/login", {
        email,
        password,
      });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error("Credenciais inválidas.");
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const getProfile = async () => {
    if (!token) throw new Error("Usuário não autenticado.");
    const response = await axios.get("http://localhost:8080/api/usuarios/my-profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, getProfile, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider.");
  return context;
};
