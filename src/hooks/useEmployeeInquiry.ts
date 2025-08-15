import { useState, useEffect } from "react";
import {
  EContractStatus,
  IEmployee,
  IEmploymentContract,
} from "@ptypes/employeePortalBusiness.types";
import { employeeByNickname } from "@services/employeePortal/getEmployeeInquiry";

const validateContractStatus = (
  employmentContracts: IEmploymentContract[],
): boolean => {
  if (!employmentContracts || employmentContracts.length === 0) return false;
  return employmentContracts.some(
    (contract) => contract.contractStatus === EContractStatus.formalized,
  );
};

export const useEmployeeByNickname = (
  nickname: string,
  businessUnit: string,
) => {
  const [employee, setEmployee] = useState<IEmployee>({} as IEmployee);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [codeError, setCodeError] = useState<number | null>(null);

  useEffect(() => {
    if (!nickname || !businessUnit) return;
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const result = await employeeByNickname(nickname, businessUnit);
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
      } finally {
        setLoading(false);
      }
      if (error) {
        setCodeError(1004);
      }
    };

    fetchEmployee();
  }, [nickname, businessUnit]);

  return { employee, loading, error, codeError };
};
