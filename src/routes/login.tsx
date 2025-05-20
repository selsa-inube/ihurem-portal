import { Route, Routes } from "react-router-dom";
import { Clients } from "@pages/login/outlets/Clients";
import { LoadingApp } from "@pages/login/outlets/LoadingApp";
import { IClient } from "@context/AppContext/types";

export interface IClients {
  clients: IClient[];
}

function LoginRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Clients />} />
      <Route path="loading-app" element={<LoadingApp />} />
    </Routes>
  );
}

export { LoginRoutes };
