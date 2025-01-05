import React, { useEffect, useState } from "react";
import { listarCarrosPaginado, deletarCarro, buscarCarroPorId } from "../../services/car-service";
import {
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Carro } from "../../models/car";
import CarForm from "../CarForm/CarForm";
import './CarList.css';

const CarList: React.FC = () => {
  const [carros, setCarros] = useState<Carro[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Carro | null>(null);

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

  const handleEdit = async (id: number) => {
    try {
      const carro = await buscarCarroPorId(id);
      setEditingCar(carro); // Define o carro que está sendo editado
      setOpen(true); // Abre o modal
    } catch (error) {
      console.error(`Erro ao buscar o carro ID: ${id}`, error);
      setError(`Erro ao buscar o carro ID: ${id}`);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletarCarro(id);
      fetchCarros(currentPage, pageSize);
    } catch {
      setError(`Erro ao deletar o carro ID: ${id}`);
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

  const handleOpenForm = () => {
    setEditingCar(null);
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
  };

  const handleCarSaved = () => {
    fetchCarros(currentPage, pageSize);
    handleCloseForm();
  };

  return (
    <div className="car-list-container">
      {error && <p className="error-message">{error}</p>}
      <div className="page-controls">
        <label htmlFor="pageSize">Itens por página:</label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={handlePageSizeChange}
          className="input-box"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <table className="table-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Modelo</th>
            <th>Ano</th>
            <th>Cor</th>
            <th>Cavalos de Potência</th>
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
              <td>{carro.cavalosDePotencia}</td>
              <td>{carro.fabricante}</td>
              <td>{carro.pais}</td>
              <td>
                <div className="buttons">
                  <button
                    onClick={() => handleEdit(carro.id)}
                    className="edit-button"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(carro.id)}
                    className="delete-button"
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="button"
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`button ${index === currentPage ? "active" : ""}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage + 1 >= totalPages}
          className="button"
        >
          Próximo
        </button>
      </div>

      <Fab 
        color="primary" 
        aria-label="add" 
        onClick={handleOpenForm} 
        style={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleCloseForm} maxWidth="md" fullWidth>
        <DialogTitle>{editingCar ? "Editar Carro" : "Cadastrar Carro"}</DialogTitle>
        <DialogContent>
          <CarForm onCarAdded={handleCarSaved} initialData={editingCar} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CarList;
