import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoutes() {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        return <Navigate to={"/"} />;
      }
    } catch (error) {
      return <Navigate to={"/"} />;
    }
  } else {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
