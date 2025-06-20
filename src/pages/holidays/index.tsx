import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";

import { useHumanResourceRequests } from "@hooks/useHumanResourceRequests";
import { useDeleteRequest } from "@hooks/useDeleteRequest";
import { useErrorFlag } from "@hooks/useErrorFlag";
import { InfoModal } from "@components/modals/InfoModal";
import { ERequestType } from "@ptypes/humanResourcesRequest.types";
import { parseDataSafely, getValueFromData } from "@utils/parser";

import { formatHolidaysData } from "./config/table.config";
import { HolidaysOptionsUI } from "./interface";
import { breadcrumbs } from "./config/nav.config";
import { IHolidaysTable } from "./components/HolidaysTable/types";

function HolidaysOptions() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 1060px)");

  const {
    data: enjoyedData,
    isLoading: isLoadingEnjoyed,
    rawData: rawEnjoyedData,
  } = useHumanResourceRequests<IHolidaysTable>(
    formatHolidaysData,
    "VacationsEnjoyed",
  );

  const {
    data: paidData,
    isLoading: isLoadingPaid,
    rawData: rawPaidData,
  } = useHumanResourceRequests<IHolidaysTable>(
    formatHolidaysData,
    "PaidVacations",
  );

  const [tableData, setTableData] = useState<IHolidaysTable[]>([]);

  const hasActiveContract = true;
  const hasEnjoymentPrivilege = true;
  const hasPaymentPrivilege = true;

  const {
    handleDelete,
    validateDelete,
    validationModal,
    closeValidationModal,
  } = useDeleteRequest((filterFn) => {
    setTableData((prev) => prev.filter(filterFn));
  });

  const handleDeleteRequest = (requestId: string, justification?: string) => {
    const request = tableData.find((item) => item.requestId === requestId);
    const requestNumber = request?.requestNumber ?? "";

    const allRawData = [...(rawEnjoyedData ?? []), ...(rawPaidData ?? [])];
    const originalRequest = allRawData.find(
      (req) => req.humanResourceRequestId === requestId,
    );

    let requestData;
    if (originalRequest) {
      const parsedData = parseDataSafely(
        originalRequest.humanResourceRequestData,
      );
      requestData = {
        requestType: originalRequest.humanResourceRequestType as ERequestType,
        disbursementDate: getValueFromData(
          parsedData,
          "disbursementDate",
          null,
        ) as string | null,
        startDateEnment: getValueFromData(
          parsedData,
          "startDateEnment",
          null,
        ) as string | null,
      };
    }

    if (!justification) {
      return validateDelete(requestData);
    }

    void handleDelete(requestId, justification, requestNumber);
  };

  useEffect(() => {
    const combined: IHolidaysTable[] = [...enjoyedData, ...paidData];
    setTableData(combined);
  }, [enjoyedData, paidData]);

  const isLoadingRequests = isLoadingEnjoyed ?? isLoadingPaid;

  useEffect(() => {
    if (location.state?.showFlag) {
      const timer = setTimeout(() => {
        navigate(location.pathname, { replace: true });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state?.showFlag]);

  useErrorFlag(
    location.state?.showFlag,
    location.state?.flagMessage,
    location.state?.flagTitle,
    location.state?.isSuccess,
  );

  return (
    <>
      <HolidaysOptionsUI
        appName={breadcrumbs.label}
        appRoute={breadcrumbs.crumbs}
        navigatePage={breadcrumbs.url}
        tableData={tableData}
        isLoadingRequests={isLoadingRequests}
        hasActiveContract={hasActiveContract}
        isMobile={isMobile}
        hasEnjoymentPrivilege={hasEnjoymentPrivilege}
        hasPaymentPrivilege={hasPaymentPrivilege}
        handleDeleteRequest={handleDeleteRequest}
      />
      {validationModal.show && (
        <InfoModal
          title="Información"
          titleDescription="¿Por qué no se puede descartar?"
          description={validationModal.message}
          buttonText="Entendido"
          onCloseModal={closeValidationModal}
        />
      )}
    </>
  );
}

export { HolidaysOptions };
