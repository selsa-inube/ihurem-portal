import { useEffect, useState } from "react";
import { EmployeeContractAggregate } from "@ptypes/employeeContractAggregate";
import { getEmployeeContracts } from "@services/employeeConsultation/getEmployeeContractById";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { Logger } from "@utils/logger";

const ERROR_CODE_INVALID_USER = 1004;
const LOCAL_STORAGE_KEY = "employeeContracts";

export const useEmployeeContracts = (
  businessUnit: string,
  employeeId?: string,
) => {
  const [contracts, setContracts] = useState<EmployeeContractAggregate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [codeError, setCodeError] = useState<number | null>(null);
  const [fetched, setFetched] = useState(false);

  const { showErrorModal } = useErrorModal();

  useEffect(() => {
    if (!businessUnit || !employeeId) {
      return;
    }

    let isMounted = true;

    const fetchContracts = async () => {
      setLoading(true);
      setFetched(false);

      try {
        const result = await getEmployeeContracts({
          businessUnit,
          employeeId,
        });

        if (!isMounted) return;

        setContracts(result);

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(result));

        setError(false);
        setCodeError(null);
        setFetched(true);
      } catch (err) {
        if (!isMounted) return;

        Logger.error(
          "[useEmployeeContracts] Error fetching employee contracts",
          err instanceof Error ? err : undefined,
          { businessUnit, employeeId },
        );

        setContracts([]);

        localStorage.removeItem(LOCAL_STORAGE_KEY);

        setError(true);
        setCodeError(ERROR_CODE_INVALID_USER);
        setFetched(true);

        const errorConfig = modalErrorConfig[ERROR_CODE_INVALID_USER];
        showErrorModal({
          descriptionText: errorConfig.descriptionText,
          solutionText: errorConfig.solutionText,
        });
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchContracts();

    return () => {
      isMounted = false;
    };
  }, [businessUnit, employeeId, showErrorModal]);

  return {
    contracts,
    loading,
    error,
    codeError,
    fetched,
  };
};
