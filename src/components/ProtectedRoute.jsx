import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import UserDataContext from "../contexts/UserDataContext";

const ProtectedRoute = ({ children, anonymous = false }) => {
  const location = useLocation();
  const from = location.state?.from || "/";
  const { user } = useContext(UserDataContext);

  if (user.name?.length && anonymous) {
    return <Navigate to={from} />;
  }

  if (!user.name?.length && !anonymous) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
