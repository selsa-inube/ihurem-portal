interface ErrorDetail {
  message: string;
  whatWentWrong: string;
  howToFix: string;
}

const errorCodes: Record<number, ErrorDetail> = {
  400: {
    message: "",
    whatWentWrong: `
      <ul>
        <li>La solicitud no se pudo procesar debido a datos inválidos.</li>
        <li>Asegúrate de que los datos enviados sean correctos.</li>
      </ul>
    `,
    howToFix: `
      <ul>
        <li>Revisa los datos que enviaste y asegúrate de que sean correctos.</li>
        <li>Intenta nuevamente con datos válidos.</li>
      </ul>
    `,
  },
  401: {
    message: "",
    whatWentWrong: `
      <ul>
        <li>No tienes permisos para acceder a este recurso.</li>
        <li>Tu sesión puede haber expirado.</li>
      </ul>
    `,
    howToFix: `
      <ul>
        <li>Inicia sesión con una cuenta válida.</li>
        <li>Si el problema persiste, contacta al soporte.</li>
      </ul>
    `,
  },
  403: {
    message: "",
    whatWentWrong: `
      <ul>
        <li>Acceso denegado a la página solicitada.</li>
        <li>Puede que no tengas los privilegios necesarios.</li>
      </ul>
    `,
    howToFix: `
      <ul>
        <li>Contacta al administrador si crees que esto es un error.</li>
        <li>Verifica tus permisos de acceso.</li>
      </ul>
    `,
  },
  404: {
    message: "",
    whatWentWrong: `
      <ul>
        <li>La URL solicitada no se encontró en el servidor.</li>
        <li>Puede que la página haya sido eliminada o movida.</li>
      </ul>
    `,
    howToFix: `
      <ul>
        <li>Verifica la URL o vuelve a la página principal.</li>
        <li>Usa el menú de navegación para encontrar lo que buscas.</li>
      </ul>
    `,
  },
  500: {
    message: "",
    whatWentWrong: `
      <ul>
        <li>Ocurrió un problema en el servidor.</li>
        <li>Puede que haya un error temporal en el sistema.</li>
      </ul>
    `,
    howToFix: `
      <ul>
        <li>Intenta nuevamente más tarde o contacta al soporte.</li>
        <li>Proporciona detalles del error si es posible.</li>
      </ul>
    `,
  },
};

export { errorCodes };
