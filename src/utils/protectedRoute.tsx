import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import Authcontext from "./context"
interface ProtectedRouteProps {
  children: JSX.Element
  allowedRoles: string[]
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const navigate = useNavigate()
  const isAuthenticated = !!localStorage.getItem("token")
  const context = useContext(Authcontext)
  const userRole = context.user.role

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
    if (userRole && !allowedRoles.includes(userRole)) {
      navigate("/unauthorized")
    }
  }, [isAuthenticated, navigate])
  return children
}

export default ProtectedRoute
