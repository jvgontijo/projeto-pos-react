import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { criarCarro } from "../../services/car-service";
import './CarForm.css';

interface CarFormProps {
  onCarAdded: () => void;
}

const CarForm: React.FC<CarFormProps> = ({ onCarAdded }) => {
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [cor, setCor] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [pais, setPais] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCar = { modelo, ano, cor, fabricante, pais };

    try {
      await criarCarro(newCar);
      onCarAdded();
    } catch (error) {
      console.error("Erro ao cadastrar o carro:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label htmlFor="modelo">Modelo</label>
      <TextField
        id="modelo"
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
        fullWidth
        className="form-input"
        required
        variant="outlined"
      />
      
      <label htmlFor="ano">Ano</label>
      <TextField
        id="ano"
        type="number"
        value={ano}
        onChange={(e) => setAno(e.target.value)}
        fullWidth
        className="form-input"
        required
        variant="outlined"
      />
      
      <label htmlFor="cor">Cor</label>
      <TextField
        id="cor"
        value={cor}
        onChange={(e) => setCor(e.target.value)}
        fullWidth
        className="form-input"
        required
        variant="outlined"
      />
      
      <label htmlFor="fabricante">Fabricante</label>
      <TextField
        id="fabricante"
        value={fabricante}
        onChange={(e) => setFabricante(e.target.value)}
        fullWidth
        className="form-input"
        required
        variant="outlined"
      />
      
      <label htmlFor="pais">País</label>
      <TextField
        id="pais"
        value={pais}
        onChange={(e) => setPais(e.target.value)}
        fullWidth
        className="form-input"
        required
        variant="outlined"
      />
      
      <Button type="submit" className="form-button">
        Cadastrar
      </Button>
    </form>
  );
};

export default CarForm;
