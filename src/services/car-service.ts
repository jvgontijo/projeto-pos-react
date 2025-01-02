import api from "./api";

export const listarCarrosPaginado = async (page = 0, size = 10) => {
  const response = await api.get('/carros', {
    headers: {
      page: page.toString(),
      size: size.toString(),
    },
  });

  return {
    content: response.data,
    totalElements: parseInt(response.headers['x-total-count'] || '0', 10),
  };
};


export const buscarCarrosPorCriterios = (modelo?: string, fabricante?: string, pais?: string) =>
  api
    .get('/carros/search', { headers: { modelo, fabricante, pais } })
    .then((res) => res.data);

export const buscarCarroPorId = (id: number) =>
  api.get(`/carros/${id}`).then((res) => res.data);

export const criarCarro = (carro: any) =>
  api.post('/carros', carro).then((res) => res.data);

export const atualizarCarro = (id: number, carroAtualizado: any) =>
  api.put(`/carros/${id}`, carroAtualizado).then((res) => res.data);

export const deletarCarro = (id: number) =>
  api.delete(`/carros/${id}`).then((res) => res.data);

export const exportarCarros = () =>
  api.get('/carros/export-cars', { responseType: 'blob' }).then((res) => res.data);

export default {
  listarCarrosPaginado,
  buscarCarrosPorCriterios,
  buscarCarroPorId,
  criarCarro,
  atualizarCarro,
  deletarCarro,
  exportarCarros,
};
