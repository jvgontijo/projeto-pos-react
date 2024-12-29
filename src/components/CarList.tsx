import React, { useEffect, useState } from 'react';
import { listarCarros, deletarCarro } from '../services/axiosConfig';
import { Carro } from '../models/car';

const CarList: React.FC = () => {
  const [carros, setCarros] = useState<Carro[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarros = async () => {
      try {
        const response = await listarCarros();
        setCarros(response);
      } catch (err) {
        setError('Erro ao carregar os carros.');
      }
    };

    fetchCarros();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deletarCarro(id);
      setCarros((prev) => prev.filter((carro) => carro.id !== id));
    } catch (err) {
      setError('Erro ao deletar o carro.');
    }
  };

  return (
    <div>
      <h1>Lista de Carros</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
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
              <td>{carro.id}</td>
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
    </div>
  );
};

export default CarList;
