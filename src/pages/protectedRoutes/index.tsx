import { ReactNode, useState, useEffect } from "react";

import { useAppContext } from "@context/AppContext/useAppContext";
import { InfoModal } from "@components/modals/InfoModal";

interface ProtectedRouteProps {
  element: ReactNode;
  optionCode?: string;
  enforcePrivilegeCheck?: boolean;
}

function ProtectedRoute({
  element,
  optionCode,
  enforcePrivilegeCheck,
}: ProtectedRouteProps) {
  const { employeeOptions } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (optionCode && employeeOptions) {
      const hasPrivilege = employeeOptions.some(
        (opt) => opt.optionCode === optionCode,
      );
      if (!hasPrivilege) {
        setShowModal(true);
      }
    }

    if (enforcePrivilegeCheck) {
      setShowModal(true);
    }
  }, [optionCode, employeeOptions, enforcePrivilegeCheck]);

  if (showModal) {
    return (
      <InfoModal
        title="Acceso denegado"
        titleDescription="No tienes privilegios para acceder a esta ruta."
        description="Por favor, contacta con el administrador si crees que es un error."
        buttonText="Entendido"
        onCloseModal={() => (window.location.href = "/")}
      />
    );
  }

  return <>{element}</>;
}

export { ProtectedRoute };
