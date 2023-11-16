import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes(props) {
  const token = localStorage.getItem("token");

  return !token ? <Navigate to={"/"} /> : <Outlet />;
}

export default ProtectedRoutes;
