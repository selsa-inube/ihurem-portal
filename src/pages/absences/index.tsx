import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useHumanResourceRequests } from "@hooks/useHumanResourceRequests";
import { ERequestType } from "@ptypes/humanResourcesRequest.types";
import { useDeleteRequest } from "@hooks/useDeleteRequest";
import { useErrorFlag } from "@hooks/useErrorFlag";

import { formatAbsenceRequests } from "./config/table.config";
import { breadcrumbs } from "./config/nav.config";
import { AbsencesOptionsUI } from "./interface";
import { IAbsencesProcedureTable } from "./components/AbsencesProcedureTable/types";

function AbsencesOptions() {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: fetchedData, error } =
    useHumanResourceRequests<IAbsencesProcedureTable>(
      formatAbsenceRequests,
      ERequestType.absence,
    );

  const [tableData, setTableData] = useState<IAbsencesProcedureTable[]>([]);
  const [flagConfig, setFlagConfig] = useState<{
    showFlag: boolean;
    flagMessage: string;
    flagTitle: string;
    isSuccess: boolean;
  }>({
    showFlag: false,
    flagMessage: "",
    flagTitle: "",
    isSuccess: false,
  });

  useEffect(() => {
    setTableData(fetchedData);
  }, [fetchedData]);

  useEffect(() => {
    if (error) {
      setFlagConfig({
        showFlag: true,
        flagMessage: "Error al obtener las solicitudes de ausencias.",
        flagTitle: "Error",
        isSuccess: false,
      });
    }
  }, [error]);

  useEffect(() => {
    if (location.state?.showFlag) {
      setFlagConfig({
        showFlag: location.state.showFlag,
        flagMessage: location.state.flagMessage,
        flagTitle: location.state.flagTitle,
        isSuccess: location.state.isSuccess,
      });

      const timer = setTimeout(() => {
        navigate(location.pathname, { replace: true });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state?.showFlag, navigate, location.pathname]);

  const { handleDelete } = useDeleteRequest<IAbsencesProcedureTable>(
    (filterFn) => {
      setTableData((prev) => prev.filter(filterFn));
    },
  );

  useErrorFlag(
    flagConfig.showFlag,
    flagConfig.flagMessage,
    flagConfig.flagTitle,
    flagConfig.isSuccess,
  );

  const handleDeleteRequest = async (
    requestId: string,
    justification: string,
  ) => {
    console.log("🗑️ handleDeleteRequest invocado con:", {
      requestId,
      justification,
    });

    try {
      const request = tableData.find(
        (item) => item.dataDetails?.value?.humanResourceRequestId === requestId,
      );

      const requestNumber =
        request?.dataDetails?.value?.humanResourceRequestNumber ?? "";

      await handleDelete(requestId, justification, requestNumber);

      setFlagConfig({
        showFlag: true,
        flagMessage: "La ausencia fue eliminada correctamente.",
        flagTitle: "Eliminación exitosa",
        isSuccess: true,
      });
    } catch {
      setFlagConfig({
        showFlag: true,
        flagMessage: "Ocurrió un error al eliminar la ausencia.",
        flagTitle: "Error al eliminar",
        isSuccess: false,
      });
    }
  };

  return (
    <AbsencesOptionsUI
      appName={breadcrumbs.label}
      appDescription={breadcrumbs.description}
      appRoute={breadcrumbs.crumbs}
      navigatePage={breadcrumbs.url}
      handleDeleteRequest={(id, justification) => {
        void handleDeleteRequest(id, justification);
      }}
    />
  );
}

export { AbsencesOptions };
