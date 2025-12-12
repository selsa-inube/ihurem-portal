export const holidays = {
  general: {
    understood: "Entendido",
  },

  breadcrumbs: {
    home: "Inicio",
    vacations: "Vacaciones",
    requestPayment: "Solicitar pago",
    enjoyment: "Solicitar disfrute",
  },

  requestPayment: {
    title: "Solicitar pago",
    confirmationMessage: "¿Realmente deseas enviar la solicitud de pago?",
  },

  inProgressTable: {
    caption: "Solicitudes de vacaciones en trámite",
    headers: {
      requestType: "Tipo de solicitud de vacaciones",
      requestDate: "Fecha de solicitud",
      businessDays: "Cantidad de días hábiles",
      status: "Estado de la solicitud",
      viewDetails: "Ver detalles de la solicitud",
      delete: "Eliminar solicitud",
    },
  },

  deleteModal: {
    title: "Eliminación",
    buttonText: "Eliminar",
    inputLabel: "Justificación",
    inputPlaceholder: "¿Por qué eliminarás el registro?",
    cancelButtonText: "Cancelar",
    discardTitle: "Descartar",
    discardButton: "Descartar",
    discardDescription:
      "Al descartar una solicitud esta no podrá continuar su trámite y desaparecerá. ¿Realmente quieres descartar esta solicitud?",
  },

  requestEnjoyment: {
    confirmationMessage: "¿Realmente deseas enviar la solicitud de vacaciones?",
  },

  flags: {
    sentTitle: "Solicitud enviada",
    sentMessage: "La solicitud de pago fue enviada exitosamente.",
  },

  tabs: {
    daysUsed: "Días utilizados",
    requestsMobile: "Solicitudes en trámite",
    requestsDesktop: "Solicitudes de vacaciones en trámite",
  },

  actions: {
    enjoyment: "Agregar solicitud de disfrute",
    payment: "Agregar solicitud de pago",
    requestPayment: "Solicitar Pago",
    enjoymentRequest: "Solicitar disfrute",
    paymentRequest: "Solicitar pago",
    viewMore: "Ver más detalles",
    noPrivileges: "Sin privilegios",
    deleteRequest: "Descartar solicitud",
  },

  assisted: {
    back: "Anterior",
    next: "Siguiente",
    submit: "Enviar",

    steps: {
      unmetRequirements: {
        name: "Requisitos no cumplidos",
        description: "Revisa los requisitos para el disfrute de vacaciones.",
      },
      generalInformation: {
        name: "Información general",
        description: "Proporciona información acerca de tu solicitud.",
      },
      verification: {
        name: "Verificación",
        description: "Verifica la información proporcionada.",
      },
    },
  },

  modal: {
    title: "Requisitos",
    close: "Cerrar",
    detailsTitle: "Detalles de solicitudes de vacaciones",
  },

  infoModal: {
    title: "Acción inhabilitada",
    reasonTitle: "¿Por qué está inhabilitado?",
    enjoymentBlocked:
      "No se puede solicitar disfrute de vacaciones, ya que no tiene un contrato activo o no cuenta con los privilegios necesarios.",
    paymentBlocked:
      "No se puede solicitar pago de vacaciones, ya que no tiene un contrato activo o no cuenta con los privilegios necesarios.",
    info: "Información",
    noPrivileges: "No tienes privilegios",
    noPrivilegesDetail: "No tienes privilegios para ver detalles.",
    noPrivilegesDelete: "No tienes privilegios para eliminar este registro.",
  },

  daysUsed: {
    title: "Consulta de días utilizados",
    empty: "Aún no has utilizado ningún día de vacaciones.",
    caption: "Consulta de días utilizados",
    headers: {
      startDate: "Fecha de inicio o pago",
      usageMode: "Modalidad de uso",
      days: "Días",
      actions: "Acciones",
    },
  },

  inProgress: {
    title: "Solicitudes en trámite",
  },

  widget: {
    pendingDays: "Días pendientes",
  },

  verificationForm: {
    backToStep: "Regresar a este paso",
    previous: "Anterior",
    submit: "Enviar",
    verificationStepName: "Verificación",
    daysToPay: "Días hábiles a pagar:",
    contract: "Contrato:",
    observations: "Observaciones:",
    enjoymentDays: "Días de disfrute:",
    startDate: "Fecha de inicio:",
  },

  alerts: [
    {
      title: "Alerta 1",
      requirement: "Estar al día en las obligaciones.",
      cause: "El cliente tiene en mora el crédito de vivienda.",
    },
    {
      title: "Alerta 2",
      requirement: "Requiere 90 días de antigüedad.",
      cause: "El cliente tiene solo 60 días de afiliación.",
    },
  ],

  contractOptions: {
    workContract: "Contrato por obra o labor",
    fixedContract: "Contrato de trabajo a término fijo",
    indefiniteContract: "Contrato de trabajo a término indefinido",
  },

  generalInformationForm: {
    daysToPayLabel: "Días hábiles a pagar",
    daysToPayPlaceholder: "Ej: 2",
    enjoymentDaysLabel: "Días de disfrute",
    contractLabel: "Contrato",
    contractPlaceholder: "Selecciona de la lista",
    observationsLabel: "Observaciones",
    startDateLabel: "Fecha de inicio",
    observationsPlaceholder: "Detalles a tener en cuenta.",
    nextButton: "Siguiente",
  },

  certificationOptions: {
    serverCertificate: "Certificado de servidor",
    companyMembership: "Certificado de pertenencia a empresa",
    representativeCertificate: "Certificado de representante",
  },
};
