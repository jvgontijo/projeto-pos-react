import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Header from "./components/Header/Header";
import CarList from "./components/CarList/CarList";
import CarForm from "./components/CarForm/CarForm";
import LoginPage from "./components/Auth/LoginPage/LoginPage";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CarList />} />
          <Route path="car-form" element={<CarForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
