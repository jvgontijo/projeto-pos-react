import React, { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();


  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };


  const handleProfile = () => {
    console.log("Redirecionando para o perfil!");
  };

  return (
    <header className="header">
      <div className="header-title">Projeto Pós - Carros</div>
      <div className="header-menu">
        <button className="menu-button" onClick={handleMenuToggle}>
          ⚙️ Opções
        </button>
        {menuOpen && (
          <div className="menu-dropdown">
            <button onClick={handleProfile}>Perfil</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
