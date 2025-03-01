import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ component, redirectTo }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? component : <Navigate to={redirectTo} />;
}
