export const absences = {
  common: {
    noData: "Sin dato",
    hours: "horas",
    days: "días",
    disabledReasonTitle: "¿Por qué está inhabilitado?",
    alertTitle: "Alerta",
    close: "Cerrar",
  },

  actions: {
    viewDetails: "Ver detalles de ausencia",
    download: "Descargar ausencia",
    report: "Reportar ausencia",
    requirements: "Requisitos",
  },

  wizard: {
    back: "Anterior",
    next: "Siguiente",
    submit: "Enviar",
  },

  tabs: {
    reportedShort: "Reportadas",
    reported: "Ausencias reportadas",
    inProgressShort: "En trámite",
    inProgress: "Solicitudes de ausencias en trámite",
  },

  messages: {
    noPrivileges: "No tienes permisos para realizar esta acción.",
    actionDisabled:
      "No se puede reportar ausencia, ya que no tiene un contrato activo o no cuenta con los privilegios necesarios.",
  },

  breadcrumbs: {
    appName: "Reportar ausencia",
    description: "Completa el asistido para reportar una ausencia.",
    home: "Inicio",
    absences: "Ausencias",
    report: "Reportar",
  },

  modals: {
    sendConfirmation: "¿Realmente deseas enviar esta solicitud de ausencia?",

    disabledActionTitle: "Acción inhabilitada",

    startTimeError: {
      description: "Incluiste una duración en horas.",
      solution:
        'Para continuar primero debes seleccionar la "Hora de inicio aproximada" para la ausencia.',
    },

    requiredDocumentsError: {
      solution:
        "Para continuar debes cargar los documentos que sean obligatorios.",
    },
  },

  flags: {
    errorTitle: "Error",
    fetchError: "Error al obtener las solicitudes de ausencias.",
    deleteSuccessTitle: "Solicitud eliminada",
    deleteSuccessMessage: "La ausencia fue eliminada correctamente.",
    deleteErrorMessage: "No fue posible eliminar la ausencia.",
  },
};
