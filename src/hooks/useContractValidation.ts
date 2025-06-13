import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "@context/AppContext";
import { useEmployee } from "@hooks/useEmployee";
import { useErrorFlag } from "@hooks/useErrorFlag";
import { EmploymentContract } from "@ptypes/employeePortalConsultation.types";

const FORMALIZED_STATUS = "Formalized";

const isContractActive = (status: string, deadline: string): boolean => {
  if (status !== FORMALIZED_STATUS) return false;
  if (!deadline) return true;
  const currentDate = new Date();
  const endDate = new Date(deadline);
  return endDate > currentDate;
};

const areAllContractsFinalized = (contracts: EmploymentContract[]): boolean => {
  if (!contracts || contracts.length === 0) return true;
  return contracts.every(
    (contract) =>
      contract.contractStatus === "Finalized" ||
      !isContractActive(contract.contractStatus, contract.deadline),
  );
};

export const useContractValidation = () => {
  const navigate = useNavigate();
  const { employees } = useAppContext();
  const { employee } = useEmployee(employees.employeeId);

  const contracts = employee?.employmentContracts ?? [];
  const allContractsFinalized = areAllContractsFinalized(contracts);

  const shouldShowError = contracts.length > 0 && allContractsFinalized;

  useErrorFlag(
    shouldShowError,
    "No tienes contratos vigentes. La sesión se cerrará automáticamente.",
    "Sesión Finalizada",
    false,
    5000,
  );

  useEffect(() => {
    if (shouldShowError) {
      const timer = setTimeout(() => {
        navigate("/logout");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [shouldShowError, navigate]);

  return {
    contracts,
    areAllContractsFinalized: allContractsFinalized,
    shouldShowError,
    isContractActive,
  };
};
