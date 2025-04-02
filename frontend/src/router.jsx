import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Dashboard from "./pages/Dashboard"
import UsuariosPage from "./pages/UsuariosPage"
import AdminRoute from "./components/AdminRoute"

const AppRouter = () => {
  const token = localStorage.getItem("token")

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />

        {/* 🔐 Ruta protegida solo para admins */}
        <Route
          path="/register"
          element={
            <AdminRoute>
              <RegisterPage />
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route
          path="/usuarios"
          element={
            <AdminRoute>
              <UsuariosPage />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>

  )
}

export default AppRouter
