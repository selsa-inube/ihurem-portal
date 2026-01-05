import { useState } from "react";

import { Logger } from "@utils/logger";
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

  const [requestId, setRequestId] = useState("");

  const { employees, contracts } = useAppContext();

  const hasSingleContract = (contracts?.length ?? 0) === 1;
  const singleContract = hasSingleContract ? contracts![0] : null;

  const baseContractData = hasSingleContract
    ? {
        contractId: singleContract!.contractId ?? "",
        contractNumber: singleContract!.contractNumber ?? "",
        businessName: singleContract!.businessName ?? "",
        contractType: singleContract!.contractType ?? "",
      }
    : {
        contractId: formValues.contractId ?? "",
        contractNumber: formValues.contractNumber ?? "",
        businessName: formValues.businessName ?? "",
        contractType: formValues.contractType ?? "",
      };

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
          observationEmployee: formValues.observationEmployee ?? "",
          ...baseContractData,
        });
      } else if (
        typeRequest === ERequestType.paid_vacations &&
        isVacationPaymentData(formValues)
      ) {
        humanResourceRequestData = JSON.stringify({
          daysToPay: formValues.daysToPay ?? "",
          disbursementDate: "",
          observationEmployee: formValues.observationEmployee ?? "",
          ...baseContractData,
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
          observationEmployee: formValues.observationEmployee ?? "",
          ...baseContractData,
        });
      } else if (typeRequest === ERequestType.absence) {
        humanResourceRequestData = JSON.stringify({
          reason: formValues.motive ?? "",
          subReason: formValues.subMotive ?? "",
          motifDetail: formValues.motiveDetails ?? "",
          startDate: formValues.startDate ?? "",
          durationOfDays: formValues.daysDuration ?? "",
          ...baseContractData,
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
        setRequestId(response.humanResourceRequestId);

        if (humanResourceRequestId) {
          navigateAfterSubmission(typeRequestKey);
        }

        return true;
      }

      return false;
    } catch (error) {
      Logger.error("Error al enviar la solicitud", error as Error, {
        formValues,
        typeRequest,
        userCodeInCharge,
        userNameInCharge,
      });
      return false;
    }
  };

  return {
    requestNum,
    requestId,
    submitRequestHandler,
    navigateAfterSubmission,
    showErrorFlag,
    errorMessage,
    setShowErrorFlag,
  };
}
