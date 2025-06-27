import { useState } from "react";

import { formatDate } from "@utils/date";
import { IUnifiedHumanResourceRequestData } from "@ptypes/humanResourcesRequest.types";
import { useAppContext } from "@context/AppContext/useAppContext";

import { useRequestSubmissionAPI } from "./useRequestSubmissionAPI";
import { useRequestNavigation } from "./useRequestNavigation";

export function useRequestSubmission(
  formValues: IUnifiedHumanResourceRequestData,
  typeRequest: string,
  userCodeInCharge: string,
  userNameInCharge: string,
) {
  const [requestNum, setRequestNum] = useState("");

  const { employees } = useAppContext();

  const {
    submitRequestToAPI,
    showErrorFlag,
    errorMessage,
    setShowErrorFlag,
    humanResourceRequestId,
  } = useRequestSubmissionAPI();

  const { navigateAfterSubmission } = useRequestNavigation();

  const submitRequestHandler = async () => {
    try {
      let humanResourceRequestData: string;

      if (formValues.daysToPay) {
        humanResourceRequestData = JSON.stringify({
          daysToPay: formValues.daysToPay,
          contract: formValues.contractId,
          observations: formValues.observationEmployee,
        });
      } else if (formValues.daysOff && formValues.startDateEnyoment) {
        humanResourceRequestData = JSON.stringify({
          daysOff: formValues.daysOff,
          startDate: formatDate(formValues.startDateEnyoment),
          contract: formValues.contractId,
          observations: formValues.observationEmployee,
        });
      } else {
        humanResourceRequestData = JSON.stringify({
          certification: formValues.certificationType,
          addressee: formValues.addressee,
          contract: formValues.contractId,
          contractDesc: formValues.businessName,
          observations: formValues.observationEmployee,
        });
      }

      const requestBody = {
        employeeId: employees?.employeeId,
        humanResourceRequestData,
        humanResourceRequestDate: new Date().toISOString(),
        humanResourceRequestDescription: formValues.observationEmployee ?? "",
        humanResourceRequestStatus: "InProgress",
        humanResourceRequestType: typeRequest,
        userCodeInCharge,
        userNameInCharge,
      };

      const { success, response } = await submitRequestToAPI(requestBody);

      if (success && response?.humanResourceRequestId) {
        setRequestNum(response.humanResourceRequestNumber);

        if (humanResourceRequestId) {
          navigateAfterSubmission(typeRequest);
        }
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error in request handler:", error);
      return false;
    }
  };

  return {
    requestNum,
    submitRequestHandler,
    navigateAfterSubmission,
    showErrorFlag,
    errorMessage,
    setShowErrorFlag,
  };
}
