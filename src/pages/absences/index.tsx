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

  const sorted = [...items].sort((a, b) => {
    const d1 = new Date(a.absenceStartDate).getTime();
    const d2 = new Date(b.absenceStartDate).getTime();
    return d2 - d1;
  });

  return sorted.map((item) => {
    const formattedDate = item.absenceStartDate
      ? formatDate(item.absenceStartDate)
      : "Sin dato";

    const motivo =
      AbsenceReasonES[item.absenceReason] ?? item.absenceReason ?? "Sin dato";
    const submotivo =
      AbsenceSubReasonES[item.subReason] ?? item.absenceReasonDetails ?? motivo;

    const durationLabel = item.hoursAbsent
      ? `${item.hoursAbsent} horas`
      : item.absenceDays
        ? `${item.absenceDays} días`
        : "Sin dato";

    const detailStartHour = item.absenceStartHour ?? null;
    const detailHoursAbsent = item.hoursAbsent ?? null;
    const detailDaysAbsent = item.absenceDays ?? null;

    const startHourDisplay =
      detailStartHour !== null ? `${detailStartHour}:00` : "Día completo";

    const hoursAbsentDisplay =
      detailHoursAbsent !== null ? detailHoursAbsent.toString() : "N/A";

    const daysAbsentDisplay =
      detailDaysAbsent !== null ? detailDaysAbsent.toString() : "N/A";

    return {
      reason: { value: submotivo },
      date: { value: formattedDate },
      duration: { value: durationLabel },
      view: {
        value: "",
        type: "icon",
        onClick: () => console.log("Ver detalles", item.absenceId),
      },
      download: {
        value: "",
        type: "icon",
        onClick: () => console.log("Descargar", item.absenceId),
      },
      dataDetails: {
        value: {
          ...item,
          motivo,
          submotivo,
          formattedDate,
          duration: durationLabel,

          absenceStartHour: detailStartHour,
          hoursAbsent: detailHoursAbsent,
          absenceDays: detailDaysAbsent,

          startHourDisplay: startHourDisplay,
          hoursAbsentDisplay: hoursAbsentDisplay,
          daysAbsentDisplay: daysAbsentDisplay,
          durationDisplay: durationLabel,
        },
      },
    };
  });
};

function AbsencesOptions() {
  const { data, isLoading } = useEmployeeAbsences(formatAbsences, 1, 50);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: fetchedData,
    error,
    isLoading: isLoadingRequests,
  } = useHumanResourceRequests<IAbsencesProcedureTable>(
    formatAbsenceRequests,
    ERequestType.absence,
  );

  const [tableData, setTableData] = useState<IAbsencesProcedureTable[]>([]);

  const [flagConfig, setFlagConfig] = useState({
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
