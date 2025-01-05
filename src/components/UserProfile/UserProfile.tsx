import React, { useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import './UserProfile.css';

const UserProfile: React.FC = () => {
  const { getProfile } = useAuth();
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
    <div className="profile-container">
      {profile ? (
        <div className="profile-content">
          <img
            src={profile.avatar}
            alt={`Avatar de ${profile.nome}`}
            className="profile-avatar"
          />
          <p className="profile-text"><strong>Nome:</strong> {profile.nome}</p>
          <p className="profile-text"><strong>Email:</strong> {profile.email}</p>
          <p className="profile-text"><strong>Cargo:</strong> {profile.cargo}</p>
        </div>
      ) : (
        <p className="profile-loading">Carregando...</p>
      )}
    </div>
  );
};

export default UserProfile;
