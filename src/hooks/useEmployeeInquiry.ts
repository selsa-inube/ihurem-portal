import { useState, useEffect } from "react";
import {
  EContractStatus,
  IEmployee,
  IEmploymentContract,
} from "@ptypes/employeePortalBusiness.types";
import { employeeByIdentification } from "@services/employeePortal/getEmployeeInquiry";

const validateContractStatus = (
  employmentContracts: IEmploymentContract[],
): boolean => {
  if (!employmentContracts || employmentContracts.length === 0) return false;
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

        if (Object.keys(result).length === 0) {
          setEmployee({} as IEmployee);
          setError(true);
          setCodeError(1004);
          return;
        }

        if (!validateContractStatus(result.employmentContracts)) {
          setError(true);
          setCodeError(1004);
          return;
        }

        setEmployee(result);
      } catch {
        setError(true);
        setEmployee({} as IEmployee);
        setCodeError(1004);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [identificationType, identificationNumber, businessUnit]);

  return { employee, loading, error, codeError };
};
