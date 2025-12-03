import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Logger } from "@utils/logger";
import { labels } from "@config/labels";
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
        : labels.absences.common.noData;

      const motivo =
        AbsenceReasonES[item.absenceReason] ??
        item.absenceReason ??
        labels.absences.common.noData;

      const submotivo =
        AbsenceSubReasonES[item.subReason] ??
        item.absenceReasonDetails ??
        motivo;

      const durationLabel = item.hoursAbsent
        ? `${item.hoursAbsent} ${labels.absences.common.hours}`
        : item.absenceDays
          ? `${item.absenceDays} ${labels.absences.common.days}`
          : labels.absences.common.noData;

      return {
        reason: { value: submotivo },
        date: { value: formattedDate },
        duration: { value: durationLabel },

        view: {
          value: "",
          type: "icon",
          onClick: () =>
            Logger.info(labels.absences.actions.viewDetails, {
              absenceId: item.absenceId,
            }),
        },

        download: {
          value: "",
          type: "icon",
          onClick: () =>
            Logger.info(labels.absences.actions.download, {
              absenceId: item.absenceId,
            }),
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
        title: labels.absences.flags.errorTitle,
        message: labels.absences.flags.fetchError,
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

  const { handleDelete } = useDeleteRequest<IAbsencesProcedureTable>(
    (filterFn) => {
      setTableData((prev) => prev.filter(filterFn));
    },
  );

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
        title: labels.absences.flags.deleteSuccessTitle,
        message: labels.absences.flags.deleteSuccessMessage,
        success: true,
      });
    } else {
      setTableData(fetchedData);

      setFlagState({
        show: true,
        title: labels.absences.flags.errorTitle,
        message: labels.absences.flags.deleteErrorMessage,
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
