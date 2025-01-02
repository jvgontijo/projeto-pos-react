import React, { useEffect, useState } from "react";
import './CarList.css';
import { listarCarrosPaginado, deletarCarro } from "../../services/car-service";

interface Carro {
  id: number;
  modelo: string;
  ano: number;
  cor: string;
  cavalosDePotencia: number;
  fabricante: string;
  pais: string;
}

const CarList: React.FC = () => {
  const [carros, setCarros] = useState<Carro[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [error, setError] = useState<string | null>(null);

  const fetchCarros = async (page: number, size: number) => {
    try {
      const response = await listarCarrosPaginado(page, size);
      setCarros(response.content);
      setTotalCount(response.totalElements);
      setError(null);
    } catch (err) {
      console.error("Erro ao carregar os carros:", err);
      setError("Erro ao carregar os carros.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletarCarro(id);
      fetchCarros(currentPage, pageSize);
    } catch {
      setError("Erro ao deletar o carro.");
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchCarros(newPage, pageSize);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10);
    setPageSize(newSize);
    setCurrentPage(0);
    fetchCarros(0, newSize);
  };

  useEffect(() => {
    fetchCarros(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label htmlFor="pageSize">Itens por página:</label>
        <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
      <table className="table-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Modelo</th>
            <th>Ano</th>
            <th>Cor</th>
            <th>Fabricante</th>
            <th>País</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {carros.map((carro) => (
            <tr key={carro.id}>
              <td className="table-content">{carro.id}</td>
              <td>{carro.modelo}</td>
              <td>{carro.ano}</td>
              <td>{carro.cor}</td>
              <td>{carro.fabricante}</td>
              <td>{carro.pais}</td>
              <td>
                <button onClick={() => handleDelete(carro.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={index === currentPage ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage + 1 >= totalPages}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default CarList;
