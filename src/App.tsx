import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Header from "./components/Header/Header";
import CarList from "./components/CarList/CarList";
import CarForm from "./components/CarForm/CarForm";
import LoginPage from "./components/Auth/LoginPage/LoginPage";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import UserProfile from "./components/UserProfile/UserProfile";
import { AuthProvider } from "./components/Auth/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<CarList />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
