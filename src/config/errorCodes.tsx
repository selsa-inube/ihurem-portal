interface ErrorDetail {
  whatWentWrong: string[];
  howToFix: string[];
}

const errorCodes: Record<number, ErrorDetail> = {
  400: {
    whatWentWrong: [
      "La solicitud no se pudo procesar debido a datos inválidos.",
      "Asegúrate de que los datos enviados sean correctos.",
    ],
    howToFix: [
      "Revisa los datos que enviaste y asegúrate de que sean correctos.",
      "Intenta nuevamente con datos válidos.",
    ],
  },
  401: {
    whatWentWrong: [
      "No tienes permisos para acceder a este recurso.",
      "Tu sesión puede haber expirado.",
    ],
    howToFix: [
      "Inicia sesión con una cuenta válida.",
      "Si el problema persiste, contacta al soporte.",
    ],
  },
  403: {
    whatWentWrong: [
      "Acceso denegado a la página solicitada.",
      "Puede que no tengas los privilegios necesarios.",
    ],
    howToFix: [
      "Contacta al administrador si crees que esto es un error.",
      "Verifica tus permisos de acceso.",
    ],
  },
  404: {
    whatWentWrong: [
      "La URL solicitada no se encontró en el servidor.",
      "Puede que la página haya sido eliminada o movida.",
    ],
    howToFix: [
      "Verifica la URL o vuelve a la página principal.",
      "Usa el menú de navegación para encontrar lo que buscas.",
    ],
  },
  500: {
    whatWentWrong: [
      "Ocurrió un problema en el servidor.",
      "Puede que haya un error temporal en el sistema.",
    ],
    howToFix: [
      "Intenta nuevamente más tarde o contacta al soporte.",
      "Proporciona detalles del error si es posible.",
    ],
  },
  1000: {
    whatWentWrong: [
      "El codigo del portal esta vacio",
      "El codigo del portal de la URL no es valido",
    ],
    howToFix: ["Confirma que estés usando la url adecuada."],
  },
  1001: {
    whatWentWrong: [
      "La compañía donde trabajas NO tiene los privilegios requeridos para acceder al portal.",
      "No estás registrado(a) o las atribuciones utilizadas no corresponden con las registradas.",
    ],
    howToFix: ["Confirma que estés usando la url adecuada."],
  },
  1002: {
    whatWentWrong: ["El codigo del portal no tiene un operador."],
    howToFix: ["Confirma que estés usando la url adecuada."],
  },
  1003: {
    whatWentWrong: [
      "No hay una unidad de negocio relacionada con el codigo del portal.",
    ],
    howToFix: ["Confirma que estés usando la url adecuada."],
  },
  1004: {
    whatWentWrong: ["El usuario con que accedio no es un empleado."],
    howToFix: ["Confirma que estés usando la url adecuada."],
  },
  1005: {
    whatWentWrong: ["No se encontraron opciones para el empleado."],
    howToFix: ["Confirma que estés usando la url adecuada."],
  },
};

export { errorCodes };
