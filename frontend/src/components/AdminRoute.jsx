import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export default function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" />
  }

  return children
}
