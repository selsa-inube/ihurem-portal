export interface IPostUserAccountsRequestBody {
  authorizationValue: string;
}

export interface IPostUserAccountsResponse {
  success: boolean;
  data?: {
    accessToken: string;
    idToken: string;
  };
  message?: string;
}

export interface IAuthTokensResponse {
  accessToken: string;
  idToken: string;
}

export interface IPostUserAccountsResponseWithTokens {
  success: boolean;
  data?: IAuthTokensResponse;
  message?: string;
}
