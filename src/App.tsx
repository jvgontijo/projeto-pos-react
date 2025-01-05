import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/Auth/AuthContext";
import LoginPage from "./components/Auth/LoginPage/LoginPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import CarList from "./components/CarList/CarList";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import UserProfile from "./components/UserProfile/UserProfile";

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
