import { useNavigate, Navigate, Outlet } from "react-router-dom";


const ProtectedRoute = ({ redirectPath = "/login" }) => {

  const navigate = useNavigate();  
  
  if (!authenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};


export default ProtectedRoute;
