import { useNavigate } from "react-router-dom";
import { ClientsUI } from "./interface";

function Clients() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/login/loading-app");
  };

  return <ClientsUI handleSubmit={handleSubmit} />;
}

export { Clients };
