import { useEffect, useState } from "react";

import { EmployeeContractAggregate } from "@ptypes/employeeContractAggregate";
import { getEmployeeContracts } from "@services/employeeConsultation/getEmployeeContractById";
import { useHeaders } from "@hooks/useHeaders";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

const ERROR_CODE_GET_CONTRACTS = 1007;

export const useEmployeeContracts = (employeeId?: string) => {
  const [contracts, setContracts] = useState<EmployeeContractAggregate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [codeError, setCodeError] = useState<number | null>(null);
  const [fetched, setFetched] = useState(false);

  const { getHeaders } = useHeaders();
  const { showErrorModal } = useErrorModal();

  useEffect(() => {
    if (!employeeId) {
      setFetched(false);
      return;
    }

    const fetchContracts = async () => {
      setLoading(true);
      setError(false);
      setCodeError(null);
      setFetched(false);

      try {
        const headers = await getHeaders(true);

        const result = await getEmployeeContracts({
          employeeId,
          page: 1,
          perPage: 50,
          headers,
        });

        setContracts(result);
      } catch (err) {
        setContracts([]);
        setError(true);
        setCodeError(ERROR_CODE_GET_CONTRACTS);

        const errorConfig = modalErrorConfig[ERROR_CODE_GET_CONTRACTS];
        showErrorModal({
          descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
          solutionText: errorConfig.solutionText,
        });
      } finally {
        setLoading(false);
        setFetched(true);
      }
    };

    fetchContracts();
  }, [employeeId, getHeaders, showErrorModal]);

  return {
    contracts,
    loading,
    error,
    codeError,
    fetched,
  };
};
