import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../App";
const ProtectedRoute = () => {
  const [user] = useContext(UserContext);

  // Check if the user object has any keys. Adjust this condition based on how you verify authentication
  if (!user || Object.keys(user).length === 0) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
