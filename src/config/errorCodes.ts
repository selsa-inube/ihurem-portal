interface ErrorDetail {
  message: string;
  whatWentWrong: string;
  howToFix: string;
}

const errorCodes: Record<number, ErrorDetail> = {
  400: {
    message: "Solicitud incorrecta. Verifica los datos enviados.",
    whatWentWrong: "La solicitud no se pudo procesar debido a datos inválidos.",
    howToFix:
      "Revisa los datos que enviaste y asegúrate de que sean correctos.",
  },
  401: {
    message: "No autorizado. Por favor, inicia sesión.",
    whatWentWrong: "No tienes permisos para acceder a este recurso.",
    howToFix: "Inicia sesión con una cuenta válida.",
  },
  403: {
    message: "Prohibido. No tienes permiso para acceder a este recurso.",
    whatWentWrong: "Acceso denegado a la página solicitada.",
    howToFix: "Contacta al administrador si crees que esto es un error.",
  },
  404: {
    message: "No encontrado. La página que buscas no existe.",
    whatWentWrong: "La URL solicitada no se encontró en el servidor.",
    howToFix: "Verifica la URL o vuelve a la página principal.",
  },
  500: {
    message: "Error interno del servidor. Intenta más tarde.",
    whatWentWrong: "Ocurrió un problema en el servidor.",
    howToFix: "Intenta nuevamente más tarde o contacta al soporte.",
  },
  // Agregar más códigos de error según sea necesario
};

export default errorCodes;
