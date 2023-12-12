import React, { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignupForm from "../src/components/SignupForm";
import LoginForm from "./components/LoginForm";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { AuthContext } from "./context/auth";
import setAuthToken from "./utils/setAuthToken";
import UserList from "./components/Users";

function App() {
  const token = localStorage.getItem("token");
  const { fetchUserInfo } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchUserInfo(token);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/users" element={<UserList />} />
      </Route>
    </Routes>
  );
}

export default App;
