import { ReactNode, useState, useEffect } from "react";

import { labels } from "@i18n/labels";
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
        (opt) => opt.publicCode === optionCode,
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
        title={labels.protectedRouteLabels.modal.title}
        titleDescription={labels.protectedRouteLabels.modal.titleDescription}
        description={labels.protectedRouteLabels.modal.description}
        buttonText={labels.protectedRouteLabels.modal.buttonText}
        onCloseModal={() => (window.location.href = "/")}
      />
    );
  }

  return <>{element}</>;
}

export { ProtectedRoute };
