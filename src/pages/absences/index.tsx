import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useEmployeeAbsences } from "@hooks/useEmployeeAbsences";
import { useHumanResourceRequests } from "@hooks/useHumanResourceRequests";
import { useDeleteRequest } from "@hooks/useDeleteRequest";
import { useErrorFlag } from "@hooks/useErrorFlag";
import { formatDate } from "@utils/date";

import {
  EmployeeAbsence,
  AbsenceReasonES,
  AbsenceSubReasonES,
} from "@ptypes/employeeAbsence.types";
import { ERequestType } from "@ptypes/humanResourcesRequest.types";

import { breadcrumbs } from "./config/nav.config";
import { AbsencesOptionsUI } from "./interface";
import { IAbsencesTable } from "./components/AbsenscesTable/types";
import { IAbsencesProcedureTable } from "./components/AbsencesProcedureTable/types";
import { formatAbsenceRequests } from "./config/table.config";

const formatAbsences = (items: EmployeeAbsence[]): IAbsencesTable[] => {
  if (!items) return [];

  return [...items]
    .sort(
      (a, b) =>
        new Date(b.absenceStartDate).getTime() -
        new Date(a.absenceStartDate).getTime(),
    )
    .map((item): IAbsencesTable => {
      const formattedDate = item.absenceStartDate
        ? formatDate(item.absenceStartDate)
        : "Sin dato";

      const motivo =
        AbsenceReasonES[item.absenceReason] ?? item.absenceReason ?? "Sin dato";

      const submotivo =
        AbsenceSubReasonES[item.subReason] ??
        item.absenceReasonDetails ??
        motivo;

      const durationLabel = item.hoursAbsent
        ? `${item.hoursAbsent} horas`
        : item.absenceDays
          ? `${item.absenceDays} días`
          : "Sin dato";

      return {
        reason: { value: submotivo },
        date: { value: formattedDate },
        duration: { value: durationLabel },

        view: {
          value: "",
          type: "icon",
          onClick: () => {
            console.log("Ver detalle ausencia", item.absenceId);
          },
        },

        download: {
          value: "",
          type: "icon",
          onClick: () => {
            console.log("Descargar soporte ausencia", item.absenceId);
          },
        },

        dataDetails: {
          value: {
            ...item,
            motivo,
            submotivo,
            formattedDate,
            duration: durationLabel,
          },
        },
      };
    });
};

function AbsencesOptions() {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading } = useEmployeeAbsences(formatAbsences, 1, 50);

  const {
    data: fetchedData,
    error,
    isLoading: isLoadingRequests,
  } = useHumanResourceRequests<IAbsencesProcedureTable>(
    formatAbsenceRequests,
    ERequestType.absence,
  );

  const [tableData, setTableData] = useState<IAbsencesProcedureTable[]>([]);

  const [flagState, setFlagState] = useState({
    show: false,
    message: "",
    title: "",
    success: false,
  });

  useErrorFlag(
    flagState.show,
    flagState.message,
    flagState.title,
    flagState.success,
  );

  useEffect(() => {
    setTableData(fetchedData);
  }, [fetchedData]);

  useEffect(() => {
    if (error) {
      setFlagState({
        show: true,
        title: "Error",
        message: "Error al obtener las solicitudes de ausencias.",
        success: false,
      });
    }
  }, [error]);

  useEffect(() => {
    if (location.state?.showFlag) {
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  useEffect(() => {
    if (flagState.show) {
      const timer = setTimeout(() => {
        setFlagState((prev) => ({ ...prev, show: false }));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [flagState.show]);

  const { handleDelete } = useDeleteRequest();

  const handleDeleteRequest = async (
    requestId: string,
    justification: string,
  ) => {
    const request = tableData.find(
      (item) => item.dataDetails?.value?.humanResourceRequestId === requestId,
    );

    const requestNumber =
      request?.dataDetails?.value?.humanResourceRequestNumber ?? "";

    setTableData((prev) =>
      prev.filter(
        (item) => item.dataDetails?.value?.humanResourceRequestId !== requestId,
      ),
    );

    const success = await handleDelete(requestId, justification, requestNumber);

    if (success) {
      setFlagState({
        show: true,
        title: "Solicitud eliminada",
        message: "La ausencia fue eliminada correctamente.",
        success: true,
      });
    } else {
      setTableData(fetchedData);

      setFlagState({
        show: true,
        title: "Error",
        message: "No fue posible eliminar la ausencia.",
        success: false,
      });
    }
  };

  return (
    <AbsencesOptionsUI
      appName={breadcrumbs.label}
      appDescription={breadcrumbs.description}
      appRoute={breadcrumbs.crumbs}
      navigatePage={breadcrumbs.url}
      data={data}
      loading={isLoading}
      requestsData={tableData}
      requestsLoading={isLoadingRequests}
      handleDeleteRequest={(id, justification) => {
        void handleDeleteRequest(id, justification);
      }}
    />
  );
}

export { AbsencesOptions };
