import { useContext, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context";

export const ProtectedRoutes = ({ children }) => {
  let navigate = useNavigate();
  const { token } = useContext(UserContext);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  if (!token) {
    <></>;
  }
  return <>{children}</>;
};
