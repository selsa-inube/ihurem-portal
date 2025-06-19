import { IVacationDeletion } from "./types";

export const validateVacationDeletion = (
  requestType: string,
  disbursementDate: string | null | undefined,
  startDateEnment: string | null | undefined,
): IVacationDeletion => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (requestType === "VacationsEnjoyed" && !disbursementDate) {
    return {
      canDelete: false,
      title: "No se puede eliminar la solicitud",
      message:
        "No se puede eliminar una solicitud de disfrute de vacaciones que no ha generado el desembolso del anticipo.",
    };
  }

  if (requestType === "PaidVacations" && !disbursementDate) {
    return {
      canDelete: false,
      title: "No se puede eliminar la solicitud",
      message:
        "No se puede eliminar una solicitud de pago de vacaciones que no ha generado el desembolso del anticipo.",
    };
  }

  if (requestType === "VacationsEnjoyed" && startDateEnment) {
    const startDate = new Date(startDateEnment);
    startDate.setHours(0, 0, 0, 0);

    if (startDate >= today) {
      return {
        canDelete: false,
        title: "No se puede eliminar la solicitud",
        message:
          "No se puede eliminar una solicitud de disfrute de vacaciones cuyo período de disfrute aún no ha comenzado.",
      };
    }
  }

  return {
    canDelete: true,
    title: "Eliminación permitida",
  };
};
