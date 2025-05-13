import { useState } from "react";

import { formatDate } from "@utils/date";
import { HumanResourceRequestData } from "@ptypes/humanResourcesRequest.types";
import { useAppContext } from "@context/AppContext/useAppContext";

import { useRequestSubmissionAPI } from "./useRequestSubmissionAPI";
import { useRequestNavigation } from "./useRequestNavigation";

export function useRequestSubmission(
  formValues: HumanResourceRequestData,
  typeRequest: string,
  userCodeInCharge: string,
  userNameInCharge: string,
) {
  const [requestNum, setRequestNum] = useState("");

  const { selectedEmployee } = useAppContext();

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

      if ("daysToPay" in formValues) {
        humanResourceRequestData = JSON.stringify({
          daysToPay: formValues.daysToPay,
          contract: formValues.contract,
          observations: formValues.observations,
        });
      } else if ("daysOff" in formValues) {
        humanResourceRequestData = JSON.stringify({
          daysOff: formValues.daysOff,
          startDate: formatDate(formValues.startDate),
          contract: formValues.contract,
        });
      } else {
        humanResourceRequestData = JSON.stringify({
          certification: formValues.certification,
          addressee: formValues.addressee,
          contract: formValues.contract,
          contractDesc: formValues.contractDesc,
        });
      }

      const requestBody = {
        employeeId: selectedEmployee?.employeeId,
        humanResourceRequestData,
        humanResourceRequestDate: new Date().toISOString(),
        humanResourceRequestDescription: formValues.observations ?? "",
        humanResourceRequestStatus: "in_progress",
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
