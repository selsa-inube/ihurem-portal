import { useEmployeeAbsences } from "@hooks/useEmployeeAbsences";
import { formatDate } from "@utils/date";
import {
  EmployeeAbsence,
  AbsenceReasonES,
  AbsenceSubReasonES,
} from "@ptypes/employeeAbsence.types";

import { breadcrumbs } from "./config/nav.config";
import { AbsencesOptionsUI } from "./interface";
import { IAbsencesTable } from "./components/AbsenscesTable/types";

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

    return {
      reason: {
        value: submotivo,
      },
      date: {
        value: formattedDate,
      },
      duration: {
        value: durationLabel,
      },

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
        },
      },
    };
  });
};

function AbsencesOptions() {
  const { data, isLoading } = useEmployeeAbsences(formatAbsences, 1, 50);

  const handleDeleteRequest = () => {
    return;
  };

  return (
    <AbsencesOptionsUI
      appName={breadcrumbs.label}
      appDescription={breadcrumbs.description}
      appRoute={breadcrumbs.crumbs}
      navigatePage={breadcrumbs.url}
      handleDeleteRequest={handleDeleteRequest}
      data={data}
      loading={isLoading}
    />
  );
}

export { AbsencesOptions };
