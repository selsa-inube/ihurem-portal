import { useState } from "react";

import { formatWithOffset } from "@utils/date";
import { IUnifiedHumanResourceRequestData } from "@ptypes/humanResourcesRequest.types";
import { ERequestType } from "@ptypes/humanResourcesRequest.types";
import { useAppContext } from "@context/AppContext/useAppContext";

import { useRequestSubmissionAPI } from "./useRequestSubmissionAPI";
import { useRequestNavigation } from "./useRequestNavigation";

type FormValues = IUnifiedHumanResourceRequestData;

function isVacationPaymentData(data: FormValues) {
  return "daysToPay" in data;
}

function isVacationEnjoyedData(data: FormValues) {
  return "daysOff" in data;
}

export function useRequestSubmission(
  formValues: FormValues,
  typeRequest: ERequestType,
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

      if (typeRequest === ERequestType.certification) {
        humanResourceRequestData = JSON.stringify({
          certificationType: formValues.certificationType ?? "",
          addressee: formValues.addressee ?? "",
          contractId: formValues.contractId ?? "",
          contractNumber: formValues.contractNumber ?? "",
          businessName: formValues.businessName ?? "",
          contractType: formValues.contractType ?? "",
          observationEmployee: formValues.observationEmployee ?? "",
        });
      } else if (
        typeRequest === ERequestType.paid_vacations &&
        isVacationPaymentData(formValues)
      ) {
        humanResourceRequestData = JSON.stringify({
          daysToPay: formValues.daysToPay ?? "",
          disbursementDate: "",
          contractId: formValues.contractId ?? "",
          contractNumber: formValues.contractNumber ?? "",
          businessName: formValues.businessName ?? "",
          contractType: formValues.contractType ?? "",
          observationEmployee: formValues.observationEmployee ?? "",
        });
      } else if (
        typeRequest === ERequestType.vacations_enjoyed &&
        isVacationEnjoyedData(formValues)
      ) {
        humanResourceRequestData = JSON.stringify({
          daysOff: formValues.daysOff ?? "",
          startDateEnyoment: formValues.startDateEnyoment
            ? formatWithOffset(new Date(formValues.startDateEnyoment))
            : "",
          contractId: formValues.contractId ?? "",
          contractNumber: formValues.contractNumber ?? "",
          businessName: formValues.businessName ?? "",
          contractType: formValues.contractType ?? "",
          observationEmployee: formValues.observationEmployee ?? "",
        });
      } else if (typeRequest === ERequestType.absence) {
        humanResourceRequestData = JSON.stringify({
          reason: formValues.motive ?? "",
          subReason: formValues.subMotive ?? "",
          motifDetail: formValues.motiveDetails ?? "",
          startDate: formValues.startDate ?? "",
          durationOfDays: formValues.daysDuration ?? "",
          contractId: formValues.contractId ?? "",
          contractNumber: formValues.contractNumber ?? "",
          businessName: formValues.businessName ?? "",
          contractType: formValues.contractType ?? "",
        });
      } else {
        throw new Error("Tipo de solicitud no reconocido.");
      }

      const typeRequestKey = Object.keys(ERequestType).find(
        (key) => ERequestType[key as keyof typeof ERequestType] === typeRequest,
      ) as keyof typeof ERequestType;

      const requestBody = {
        employeeId: employees.employeeId,
        humanResourceRequestData,
        humanResourceRequestDate: new Date().toISOString(),
        humanResourceRequestDescription:
          formValues.observationEmployee ?? formValues.motiveDetails ?? "",
        humanResourceRequestStatus: "supervisor_approval",
        humanResourceRequestType: typeRequestKey as ERequestType,
        userCodeInCharge,
        userNameInCharge,
      };

      const { success, response } = await submitRequestToAPI(requestBody);

      if (success && response?.humanResourceRequestId) {
        setRequestNum(response.humanResourceRequestNumber);

        if (humanResourceRequestId) {
          navigateAfterSubmission(typeRequestKey);
        }

        return true;
      }

      return false;
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
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
