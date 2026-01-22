import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";

import { labels } from "@i18n/labels";
import { usePendingVacationRequests } from "@hooks/usePendingVacationReques";
import { useDeleteRequest } from "@hooks/useDeleteRequest";
import { useDeleteValidation } from "@hooks/useDeleteValidation";
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

  /**
   * NUEVO HOOK – un solo llamado al backend
   */
  const {
    data: tableData,
    rawData,
    isLoading: isLoadingRequests,
  } = usePendingVacationRequests<IHolidaysTable>(formatHolidaysData);

  const [localTableData, setLocalTableData] = useState<IHolidaysTable[]>([]);

  const hasActiveContract = true;
  const hasEnjoymentPrivilege = true;
  const hasPaymentPrivilege = true;

  const { handleDelete } = useDeleteRequest((filterFn) => {
    setLocalTableData((prev) => prev.filter(filterFn));
  });

  const { validateDelete, validationModal, closeValidationModal } =
    useDeleteValidation();

  /**
   * Eliminar solicitud
   */
  const handleDeleteRequest = (requestId: string, justification?: string) => {
    const request = localTableData.find((item) => item.requestId === requestId);
    const requestNumber = request?.requestNumber ?? "";

    const originalRequest = rawData.find(
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
      };
    }

    if (!justification) {
      return validateDelete(requestData);
    }

    void handleDelete(requestId, justification, requestNumber);
  };

  /**
   * Sincronizar data local
   */
  useEffect(() => {
    setLocalTableData(tableData);
  }, [tableData]);

  /**
   * Manejo de flags
   */
  useEffect(() => {
    if (location.state?.showFlag) {
      const timer = setTimeout(() => {
        navigate(location.pathname, { replace: true });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state?.showFlag, navigate, location.pathname]);

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
        tableData={localTableData}
        isLoadingRequests={isLoadingRequests}
        hasActiveContract={hasActiveContract}
        isMobile={isMobile}
        hasEnjoymentPrivilege={hasEnjoymentPrivilege}
        hasPaymentPrivilege={hasPaymentPrivilege}
        handleDeleteRequest={handleDeleteRequest}
      />

      {validationModal.show && (
        <InfoModal
          title={labels.holidays.infoModal.title}
          titleDescription={labels.holidays.infoModal.reasonTitle}
          description={validationModal.message}
          buttonText={labels.holidays.general.understood}
          onCloseModal={closeValidationModal}
        />
      )}
    </>
  );
}

export { HolidaysOptions };
