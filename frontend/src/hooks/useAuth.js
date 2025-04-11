export default function useAuth() {
    try {
      const token = localStorage.getItem("token")
      if (!token) return { isAuthenticated: false }
  
      const payload = JSON.parse(atob(token.split(".")[1]))
  
      return {
        isAuthenticated: true,
        user: payload,
        isAdmin: payload.rol === "Administrador"
      }
    } catch (e) {
      return { isAuthenticated: false }
    }
  }
  