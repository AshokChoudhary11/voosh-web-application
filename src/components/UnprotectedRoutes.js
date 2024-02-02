import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";

export const UnprotectedRoutes = ({ children }) => {
  let navigate = useNavigate();

  const { token } = useContext(UserContext);

  useEffect(() => {
    if (token) {
      navigate("/order");
    }
  }, [token]);

  if (token) {
    return <></>;
  }
  return <>{children}</>;
};
