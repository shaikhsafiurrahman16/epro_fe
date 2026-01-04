import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";

export default function PrivateRoute({ children }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
