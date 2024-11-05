import { Route, Routes } from "react-router-dom";
import { Clients } from "@pages/login/outlets/Clients";
import { LoadingApp } from "@pages/login/outlets/LoadingApp";
import { Login } from "@pages/login";
import { IClient } from "@context/AppContext/types";

export interface IClients {
  clients: IClient[];
}

const clients: IClient[] = [];

function LoginRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />}>
        <Route path="/" element={<Clients clients={clients} />} />
        <Route path="loading-app" element={<LoadingApp />} />
      </Route>
    </Routes>
  );
}

export { LoginRoutes };
