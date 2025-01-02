import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { authenticateUser } from "../../../services/user-service";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log(email, password);

      const response = await authenticateUser({ email: email, password });

      localStorage.setItem("authToken", response.token);

      navigate("/");
    } catch (err) {
      setError("Credenciais inválidas. Por favor, tente novamente.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
};

export default LoginPage;
