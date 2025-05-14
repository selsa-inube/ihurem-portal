import { Route, Routes } from "react-router-dom";
import { Client } from "@pages/register/Clients";
import { LoadingApp } from "@pages/login/outlets/LoadingApp";
import { Login } from "@pages/login";
import { IClient } from "@context/AppContext/types";

export interface IClients {
  clients: IClient[];
}

function RegisterRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />}>
        <Route path="/" element={<Client />} />
        <Route path="loading-app" element={<LoadingApp />} />
      </Route>
    </Routes>
  );
}

export { RegisterRoutes };
