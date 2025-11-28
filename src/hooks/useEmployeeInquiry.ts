import { useState, useEffect } from "react";

import {
  EContractStatus,
  IEmployee,
  IEmploymentContract,
} from "@ptypes/employeePortalBusiness.types";
import { employeeByIdentification } from "@services/employeePortal/getEmployeeInquiry";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

const ERROR_CODE_INVALID_USER = 1004;

const validateContractStatus = (
  employmentContracts: IEmploymentContract[],
): boolean => {
  if (!employmentContracts?.length) return true;
  return employmentContracts.some(
    (contract) => contract.contractStatus === EContractStatus.formalized,
  );
};

export const useEmployeeByIdentification = (
  identificationType: string,
  identificationNumber: string,
  businessUnit: string,
) => {
  const [employee, setEmployee] = useState<IEmployee>({} as IEmployee);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [codeError, setCodeError] = useState<number | null>(null);
  const { showErrorModal } = useErrorModal();

  useEffect(() => {
    if (!identificationType || !identificationNumber || !businessUnit) return;

    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const result = await employeeByIdentification(
          identificationType,
          identificationNumber,
          businessUnit,
        );

        if (
          !validateContractStatus(result?.employmentContracts) ||
          !Object.keys(result ?? {}).length
        ) {
          setCodeError(ERROR_CODE_INVALID_USER);
          setError(true);
          return;
        }

        setEmployee(result);
      } catch (error) {
        setError(true);
        setEmployee({} as IEmployee);
        setCodeError(ERROR_CODE_INVALID_USER);
        const errorConfig = modalErrorConfig[ERROR_CODE_INVALID_USER];

        showErrorModal({
          descriptionText: `${errorConfig.descriptionText}: ${String(error)}`,
          solutionText: errorConfig.solutionText,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [identificationType, identificationNumber, businessUnit]);

  return { employee, loading, error, codeError };
};
