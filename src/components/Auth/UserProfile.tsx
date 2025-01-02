import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const UserProfile: React.FC = () => {
  const { getProfile, logout } = useAuth();
  const [profile, setProfile] = useState<any | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };

    fetchProfile();
  }, [getProfile]);

  return (
    <div>
      <h1>Meu Perfil</h1>
      {profile ? (
        <div>
          <p>ID: {profile.id}</p>
          <p>Nome: {profile.nome}</p>
          <p>Email: {profile.email}</p>
          {/* Adicione mais campos conforme necessário */}
        </div>
      ) : (
        <p>Carregando...</p>
      )}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default UserProfile;
