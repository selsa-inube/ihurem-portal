import { useEffect, useRef, useState } from "react";

import { useSignOut } from "@hooks/useSignOut";
import { EmployeeContractAggregate } from "@ptypes/employeeContractAggregate";
import { getEmployeeContracts } from "@services/employeeConsultation/getEmployeeContractById";
import { useHeaders } from "@hooks/useHeaders";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

const ERROR_CODE_GET_CONTRACTS = 1007;

export const useEmployeeContractsValidation = (employeeId?: string) => {
  const [contracts, setContracts] = useState<EmployeeContractAggregate[]>([]);
  const [loading, setLoading] = useState(true);
  const [validated, setValidated] = useState(false);

  const hasRunRef = useRef(false);

  const { signOut } = useSignOut();
  const { getHeaders } = useHeaders();
  const { showErrorModal } = useErrorModal();

  useEffect(() => {
    if (!employeeId || hasRunRef.current) return;

    hasRunRef.current = true;

    const validateContracts = async () => {
      try {
        const headers = await getHeaders(true);

        const result = await getEmployeeContracts({
          employeeId,
          page: 1,
          perPage: 50,
          headers,
        });

        setContracts(result);
        setValidated(true);
      } catch (err) {
        const errorConfig = modalErrorConfig[ERROR_CODE_GET_CONTRACTS];

        showErrorModal({
          descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
          solutionText: errorConfig.solutionText,
        });

        signOut("/error?code=1007");
      } finally {
        setLoading(false);
      }
    };

    validateContracts();
  }, [employeeId, getHeaders, showErrorModal, signOut]);

  return {
    contracts,
    loading,
    validated,
  };
};
