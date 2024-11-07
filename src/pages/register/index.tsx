import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginUI } from "./interface";
import { useAppContext } from "@context/AppContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppContext();

  useEffect(() => {
    if (
      location.pathname === "/login" ||
      location.pathname === "/login/" ||
      location.pathname === "/"
    ) {
      navigate(`/login/${user?.id}/checking-credentials/`);
    }
  }, [location, navigate, user]);

  return <LoginUI />;
}

export { Login };
