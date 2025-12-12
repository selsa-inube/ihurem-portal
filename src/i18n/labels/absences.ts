export const absences = {
  general: {
    noData: "Sin dato",
    hours: "horas",
    days: "días",
    selectPlaceholder: "Selecciona de la lista",
  },

  procedure: {
    modals: {
      info: {
        title: "Información",
        noPrivilegesTitle: "No tienes privilegios.",
        noPrivilegesView:
          "No tienes privilegios para ver los detalles de esta ausencia.",
        noPrivilegesDelete:
          "No tienes privilegios para descartar esta ausencia.",
        noPrivilegesUpload:
          "No tienes privilegios para cargar documentos en esta ausencia.",
      },

      delete: {
        title: "Descartar ausencia",
        confirmButton: "Descartar",
        reasonLabel: "Justificación",
        reasonPlaceholder: "Ingresa la razón para descartar esta ausencia",
        warning:
          "Al descartar una ausencia esta no podrá continuar su trámite. ¿Deseas continuar?",
        understoodButton: "Entendido",
      },
    },

    details: {
      motive: "Motivo",
      submotive: "Submotivo",
      contractType: "Tipo de contrato",
      contractId: "ID del contrato",
      contractNumber: "Número de contrato",
      businessName: "Nombre del negocio",
      motiveDetails: "Detalles del motivo",
      startDate: "Fecha de inicio",
      durationDays: "Duración (días)",
    },

    headers: {
      startDate: "Fecha inicio",
      status: "Estado",
      actions: "Acciones",
      ma: "M/A",
    },

    emptyState: {
      noAbsences:
        "Aún no hay ninguna ausencia registrada. Para agregar una presiona",
      hint: "+ Reportar ausenci”.",
    },

    detailModal: {
      title: "Detalles de la ausencia",
      closeButton: "Cerrar",
      requestTitle: "Detalle de Solicitud",
      fields: {
        type: "Tipo de Ausencia",
        descriptionMotive: "Descripción del Motivo",
        startDate: "Fecha de Inicio",
        days: "Días de Ausencia",
        startHour: "Hora de Inicio",
        hours: "Horas de Ausencia",
        employeeId: "Empleado ID",
        subReason: "Sub Razón",
      },
    },
  },

  flags: {
    errorFetchTitle: "Error",
    errorFetchMessage: "Error al obtener las solicitudes de ausencias.",

    deletedTitle: "Solicitud eliminada",
    deletedMessage: "La ausencia fue eliminada correctamente.",

    deleteErrorTitle: "Error",
    deleteErrorMessage: "No fue posible eliminar la ausencia.",

    createdTitle: "Solicitud enviada",
    createdMessage: "La ausencia fue reportada exitosamente.",

    errorCreateTitle: "Error",
    errorCreateMessage:
      "No fue posible enviar la solicitud de ausencia. Inténtalo nuevamente.",

    infoRequestTitle: "Información enviada",
    infoRequestMessage: "La información adicional fue enviada correctamente.",

    infoRequestErrorTitle: "Error",
    infoRequestErrorMessage: "No fue posible enviar la información adicional.",

    documentUploadedTitle: "Documento cargado",
    documentUploadedMessage: "¡El documento se adjuntó con éxito!",
    requiredDocumentErrorTitle: "Documento requerido",
    requiredDocumentErrorMessage:
      "Debes cargar los documentos obligatorios para continuar.",
  },

  logs: {
    viewDetail: "Ver detalle ausencia",
    downloadSupport: "Descargar soporte ausencia",
  },

  breadcrumbs: {
    appName: "Ausencias",
    description: "Consulta y gestión de tus ausencias",
  },

  ui: {
    tabs: {
      reportedMobile: "Reportadas",
      reportedDesktop: "Ausencias reportadas",
      requestsMobile: "En trámite",
      requestsDesktop: "Solicitudes de ausencias en trámite",
    },

    actions: {
      reportAbsenceButton: "Reportar ausencia",
      viewDocumentsButton: "Documentos",
      restrictedAction: "No tienes permisos para realizar esta acción.",
      restrictedActionTitle: "Acción inhabilitada",
      infoTitleDescription: "¿Por qué está inhabilitado?",

      deleteButton: "Eliminar solicitud",
      sendInfoButton: "Enviar información",
      viewInfoButton: "Ver información",
      viewDetailsButton: "Ver detalle",
    },

    sections: {
      reportedAbsencesTitle: "Ausencias reportadas",
      requestsTitle: "Solicitudes de ausencias en trámite",
    },

    restrictions: {
      noPrivilegeOrContract:
        "No se puede reportar ausencia, ya que no tiene un contrato activo o no cuenta con los privilegios necesarios.",

      cannotDelete:
        "No puedes eliminar esta ausencia porque ya ha sido gestionada.",
    },

    emptyStates: {
      noReportedAbsences: "No tienes ausencias reportadas.",
      noRequests: "No tienes solicitudes de ausencia en trámite.",
    },
  },

  reportAbsence: {
    breadcrumbs: {
      label: "Reportar ausencia",
      description: "Completa el asistido para reportar una ausencia.",
      reportLabel: "Requisitos",
    },

    motive: {
      unknownOption: "Código desconocido: {{code}}",
      regulatoryFramework: "Marco legal",
      companyName: "SISTEMAS ENLINEA S.A.",
    },

    ui: {
      assisted: {
        back: "Anterior",
        next: "Siguiente",
        submit: "Enviar",
        returnToStep: "Regresar a este paso",
      },

      requirementsModal: {
        title: "Requisitos",
        closeButton: "Cerrar",
      },
      requirementsForm: {
        title: "Documentos requeridos",
        attachLabel: "Adjuntar archivo",
        requiredLabel: "Obligatorio",
        optionalLabel: "Opcional",
        placeholder: "Selecciona o arrastra tu archivo",

        noRestrictionsMessage:
          "El empleado no presenta restricción por requisitos en este momento.",
        nextButton: "Siguiente",

        emptyStates: {
          noRequirements:
            "Aún no se han configurado requisitos documentales para las condiciones de esta ausencia.",
          noDocuments: "No hay documentos para mostrar",
        },

        table: {
          requiredSuffix: "- *Requerido*",
          optionalSuffix: "- (Opcional)",
          caption: "Consulta de ausencias del empleado",

          headers: {
            document: "Documento solicitado",
            attach: "Adjuntar",
          },
        },

        documents: {
          doc1: "Cita médica programada",
          doc2: "Incapacidad médica emitida por una EPS o prepagada",
          doc3: "Orden médica de tratamiento, examen especializado o recuperación post-operatoria",
        },
      },

      durationForm: {
        motiveInfoText:
          "La duración de ausencia puede darse solo en días, solo en horas o incluir tanto días como horas. (Ej: 2 días, 3 horas)",

        labels: {
          startDate: "Fecha de inicio",
          daysDuration: "Duración en días",
          hoursDuration: "Duración en horas",
          startTime: "Hora de inicio aproximada",
        },

        placeholders: {
          days: "Ej: 2",
          hours: "Ej: 5",
          startTime: "Selecciona de la lista",
        },

        buttons: {
          previous: "Anterior",
          next: "Siguiente",
        },

        infoModal: {
          title: "Información",
          description:
            "Si escribes una duración en horas se te solicitará una “Hora de inicio aproximada”.",
          decimalsAdvice: "Puedes incluir decimales en la “Duración en horas”.",
          examplesTitle: "Por ejemplo:",
          example1: "• 0.2 horas representan 12 minutos.",
          example2: "• 1.5 horas representa 1 hora y 30 minutos.",
        },
      },
    },

    validation: {
      required: "Este campo es obligatorio.",
      invalidDate: "La fecha ingresada no es válida.",
      invalidRange: "La fecha fin debe ser mayor o igual a la fecha de inicio.",
      durationRequired: "Debes ingresar una duración válida.",
      startTimeRequired:
        "Debes seleccionar la hora de inicio cuando la duración es en horas.",
      positiveHours: "La duración en horas debe ser un número mayor a cero.",
      positiveDays: "La duración en días debe ser un número positivo.",
    },

    modals: {
      confirmSend: "¿Realmente deseas enviar esta solicitud de ausencia?",

      startTimeError: {
        title: "Alerta",
        description: "Incluiste una duración en horas.",
        solution:
          'Para continuar primero debes seleccionar la "Hora de inicio aproximada".',
      },

      requiredDocsError: {
        title: "Alerta",
        solution:
          "Para continuar debes cargar los documentos que sean obligatorios.",
      },
    },

    unpaidLeave: {
      title: "Alerta",
      short: "Las licencias deben solicitarse con anticipación.",
      description:
        "En el paso anterior seleccionaste Motivo: Licencias no remuneradas.",
      solution:
        "Las licencias no remuneradas NO pueden registrarse en una fecha anterior al día de hoy, porque deben solicitarse con anticipación.",
    },

    form: {
      absenceTypeLabel: "Tipo de ausencia",
      startDateLabel: "Fecha inicio",
      endDateLabel: "Fecha fin",
      descriptionLabel: "Descripción",
      supportLabel: "Adjuntar soporte",
      submitButton: "Enviar solicitud",
      cancelButton: "Cancelar",
      requiredField: "Este campo es obligatorio.",
      invalidDate: "La fecha ingresada no es válida.",
      invalidRange: "La fecha fin debe ser mayor o igual a la fecha de inicio.",
      motiveLabel: "Motivo",
      subMotiveLabel: "Submotivo",
      detailsLabel: "Detalles del motivo",
      detailsPlaceholder: "Más detalles acerca de la ausencia.",
      descriptionMotive: "Descripción del Motivo",
    },
  },

  sendRequestModal: {
    title: "Enviar solicitud",
    description:
      "Confirma el envío de la solicitud de ausencia con la información registrada.",
    confirmButton: "Enviar",
    cancelButton: "Cancelar",
  },

  requestInfoModal: {
    title: "Información requerida",
    description:
      "Ingresa la información solicitada para continuar con el trámite de tu ausencia.",
    placeholder: "Escribe la información...",
    confirmButton: "Enviar",
    cancelButton: "Cancelar",
  },

  options: {
    titles: {
      sentRequests: "Solicitudes enviadas",
      absenceDetails: "Detalles de la ausencia",
    },
    messages: {
      noOptions: "No hay opciones disponibles para esta ausencia.",
    },
  },

  steps: {
    requirementsNotMet: {
      name: "Requisitos no cumplidos",
      description: "Requisitos no cumplidos para reportar ausencias.",
    },
    motive: {
      name: "Motivo de ausencia",
      description: "Define detalladamente el motivo de esta ausencia.",
    },
    duration: {
      name: "Duración de ausencia",
      description: "Completa los datos de duración para esta ausencia.",
    },
    documents: {
      name: "Documentos requeridos",
      description: "Adjunta los documentos solicitados a continuación.",
    },
    verification: {
      name: "Verificación",
      description: "Confirma la información diligenciada en pasos anteriores.",
    },
  },

  futureDateError: {
    fieldValidation: "Las licencias deben solicitarse con anticipación.",
    title: "Alerta",
    description:
      "En el paso anterior seleccionaste Motivo: Licencias no remuneradas.",
    solution:
      "Las licencias no remuneradas NO pueden registrarse en una fecha anterior al día de hoy, porque deben solicitarse con anticipación.",
  },
};
