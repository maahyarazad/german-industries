// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAppState } from "../AppState";

export default function ProtectedRoute({ children }) {
  const { user, authenticated } = useAppState();
  const location = useLocation();


  if (!authenticated.value) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
