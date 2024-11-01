const IS_PRODUCTION: boolean = import.meta.env.PROD;
const AUTH_REDIRECT_URI: string = import.meta.env
  .VITE_AUTH0_REDIRECT_URI as string;

interface Environment {
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  AUTH0_DOMAIN: string;
  REDIRECT_URI: string;
}

const enviroment: Environment = {
  CLIENT_ID: import.meta.env.VITE_AUTH0_CLIENT_ID as string,
  CLIENT_SECRET: import.meta.env.VITE_AUTH0_CLIENT_SECRET as string,
  AUTH0_DOMAIN: import.meta.env.VITE_AUTH0_DOMAIN as string,
  REDIRECT_URI: IS_PRODUCTION ? AUTH_REDIRECT_URI : window.location.origin,
};

export { enviroment };
