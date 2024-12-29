import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "insomnia/10.1.1",
  },
});

export const loginUsuario = async (email: string, password: string) => {
  const response = await api.post("/usuarios/login", { email, password });
  return response.data;
};

export const listarUsuarios = async () => {
  const response = await api.get("/usuarios");
  return response.data;
};

export const listarCarros = async () => {
  const response = await api.get("/carros");
  return response.data;
};

export const buscarCarroPorId = async (id: number) => {
  const response = await api.get(`/carros/${id}`);
  return response.data;
};

export const criarCarro = async (carro: {
  modelo: string;
  ano: number;
  cor: string;
  cavalosDePotencia: number;
  fabricante: string;
  pais: string;
}) => {
  const response = await api.post("/carros", carro);
  return response.data;
};

export const atualizarCarro = async (
  id: number,
  carroAtualizado: {
    modelo: string;
    ano: number;
    cor: string;
    cavalosDePotencia: number;
    fabricante: string;
    pais: string;
  }
) => {
  const response = await api.put(`/carros/${id}`, carroAtualizado);
  return response.data;
};

export const deletarCarro = async (id: number) => {
  const response = await api.delete(`/carros/${id}`);
  return response.data;
};

export default api;
