const IS_PRODUCTION: boolean = import.meta.env.PROD;
const AUTH_REDIRECT_URI: string = import.meta.env
  .VITE_AUTH_REDIRECT_URI as string;

const maxRetriesServices = 1;
const fetchTimeoutServices = 3000;

const ERROR_REDIRECT_URI: string =
  import.meta.env.VITE_ERROR_REDIRECT_URI ?? window.location.origin;

const secretKeyPortalId = import.meta.env.VITE_SECRET_KEY_PORTAL_ID as string;

interface Environment {
  REDIRECT_URI: string;
  ERROR_REDIRECT_URI: string;
  IVITE_ISAAS_QUERY_PROCESS_SERVICE: string;
  IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE: string;
  IVITE_IHUREM_PERSISTENCE_PROCESS_SERVICE: string;
  IVITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE: string;
  COUNTRY: string;
  ORIGINATOR_ID: string;
  IAUTH_URL: string;
  IAUTH_SERVICE_URL: string;
}

const environment: Environment = {
  REDIRECT_URI: IS_PRODUCTION ? AUTH_REDIRECT_URI : window.location.origin,
  ERROR_REDIRECT_URI,
  IVITE_ISAAS_QUERY_PROCESS_SERVICE: import.meta.env
    .VITE_IVITE_ISAAS_QUERY_PROCESS_SERVICE as string,
  IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE: import.meta.env
    .VITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE as string,
  IVITE_IHUREM_PERSISTENCE_PROCESS_SERVICE: import.meta.env
    .VITE_IHUREM_PERSISTENCE_PROCESS_SERVICE as string,
  IVITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE: import.meta.env
    .VITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE as string,
  COUNTRY: import.meta.env.VITE_COUNTRY as string,
  ORIGINATOR_ID: import.meta.env.VITE_ORIGINATOR_ID as string,
  IAUTH_URL: import.meta.env.VITE_IAUTH_URL as string,
  IAUTH_SERVICE_URL: import.meta.env.VITE_IAUTH_SERVICE_URL as string,
};

export {
  environment,
  maxRetriesServices,
  fetchTimeoutServices,
  secretKeyPortalId,
};
