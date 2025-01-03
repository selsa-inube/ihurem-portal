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
};

export { errorCodes };
