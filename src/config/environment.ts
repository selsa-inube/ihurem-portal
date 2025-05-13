const IS_PRODUCTION: boolean = import.meta.env.PROD;
const AUTH_REDIRECT_URI: string = import.meta.env
  .VITE_AUTH0_REDIRECT_URI as string;

const maxRetriesServices = 1;
const fetchTimeoutServices = 3000;

const secretKeyPortalId = import.meta.env.VITE_SECRET_KEY_PORTAL_ID as string;

interface Environment {
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  AUTH0_DOMAIN: string;
  REDIRECT_URI: string;
  IVITE_ISAAS_QUERY_PROCESS_SERVICE: string;
  IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE: string;
  IVITE_IHUREM_PERSISTENCE_PROCESS_SERVICE: string;
  IVITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE: string;
  BASE_URL: string;
  COUNTRY: string;
  INCLUDES_SATURDAYS: string;
}

const environment: Environment = {
  CLIENT_ID: import.meta.env.VITE_AUTH0_CLIENT_ID as string,
  CLIENT_SECRET: import.meta.env.VITE_AUTH0_CLIENT_SECRET as string,
  AUTH0_DOMAIN: import.meta.env.VITE_AUTH0_DOMAIN as string,
  REDIRECT_URI: IS_PRODUCTION ? AUTH_REDIRECT_URI : window.location.origin,
  IVITE_ISAAS_QUERY_PROCESS_SERVICE: import.meta.env
    .VITE_IVITE_ISAAS_QUERY_PROCESS_SERVICE as string,
  IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE: import.meta.env
    .VITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE as string,
  BASE_URL: import.meta.env.VITE_API_BASE_URL as string,
  IVITE_IHUREM_PERSISTENCE_PROCESS_SERVICE: import.meta.env
    .VITE_IHUREM_PERSISTENCE_PROCESS_SERVICE as string,
  IVITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE: import.meta.env
    .VITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE as string,
  COUNTRY: import.meta.env.VITE_COUNTRY as string,
  INCLUDES_SATURDAYS: import.meta.env.VITE_INCLUDES_SATURDAYS as string,
};

export {
  environment,
  maxRetriesServices,
  fetchTimeoutServices,
  secretKeyPortalId,
};
