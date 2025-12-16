import { useState, useEffect } from "react";
import { EmployeeContractAggregate } from "@ptypes/employeeContractAggregate";
import { getEmployeeContracts } from "@services/employeeConsultation/getEmployeeContractById";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

const ERROR_CODE_INVALID_USER = 1004;

export const useEmployeeContracts = (businessUnit: string) => {
  const [contracts, setContracts] = useState<EmployeeContractAggregate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [codeError, setCodeError] = useState<number | null>(null);
  const { showErrorModal } = useErrorModal();

  useEffect(() => {
    if (!businessUnit) {
      setError(true);
      setCodeError(ERROR_CODE_INVALID_USER);
      return;
    }

    let isMounted = true;

    const fetchContracts = async () => {
      setLoading(true);
      try {
        const result = await getEmployeeContracts({ businessUnit });
        if (!isMounted) return;

        setContracts(result);
        setError(false);
        setCodeError(null);
      } catch (err) {
        if (!isMounted) return;

        console.error("Error fetching contracts:", err);
        setContracts([]);
        setError(true);
        setCodeError(ERROR_CODE_INVALID_USER);

        const errorConfig = modalErrorConfig[ERROR_CODE_INVALID_USER];
        showErrorModal({
          descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
          solutionText: errorConfig.solutionText,
        });
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchContracts();

    return () => {
      isMounted = false;
    };
  }, [businessUnit, showErrorModal]);

  return { contracts, loading, error, codeError };
};
