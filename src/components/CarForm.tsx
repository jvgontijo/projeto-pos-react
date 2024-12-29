import React, { useState } from 'react';
import { criarCarro } from '../services/axiosConfig';

const CarForm: React.FC = () => {
  const [formData, setFormData] = useState({
    modelo: '',
    ano: 0,
    cor: '',
    cavalosDePotencia: 0,
    fabricante: '',
    pais: '',
  });

  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'ano' || name === 'cavalosDePotencia' ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await criarCarro(formData);
      setMessage('Carro criado com sucesso!');
      setFormData({
        modelo: '',
        ano: 0,
        cor: '',
        cavalosDePotencia: 0,
        fabricante: '',
        pais: '',
      });
    } catch (err) {
      setMessage('Erro ao criar o carro.');
    }
  };

  return (
    <div>
      <h1>Cadastro de Carro</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Modelo:</label>
          <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} required />
        </div>
        <div>
          <label>Ano:</label>
          <input type="number" name="ano" value={formData.ano} onChange={handleChange} required />
        </div>
        <div>
          <label>Cor:</label>
          <input type="text" name="cor" value={formData.cor} onChange={handleChange} required />
        </div>
        <div>
          <label>Cavalos de Potência:</label>
          <input type="number" name="cavalosDePotencia" value={formData.cavalosDePotencia} onChange={handleChange} required />
        </div>
        <div>
          <label>Fabricante:</label>
          <input type="text" name="fabricante" value={formData.fabricante} onChange={handleChange} required />
        </div>
        <div>
          <label>País:</label>
          <input type="text" name="pais" value={formData.pais} onChange={handleChange} required />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default CarForm;
