import { environment } from "@config/environment";

import {
  ISelfRegistrationRequestBody,
  ISelfRegistrationResponse,
} from "./types";

export async function postSelfRegistration(
  requestBody: ISelfRegistrationRequestBody,
  headers: Record<string, string>,
): Promise<ISelfRegistrationResponse> {
  const response = await fetch(
    `${environment.IVITE_IHUREM_PERSISTENCE_PROCESS_SERVICE}/human-resources-requests`,
    {
      method: "POST",
      headers: {
        ...headers,
        "X-Action": "SaveHumanResourcesRequestSelfRegistration",
      },
      body: JSON.stringify(requestBody),
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData?.message ?? `Error: ${response.status}`;
    throw new Error(errorMessage);
  }

  const data = (await response.json()) as ISelfRegistrationResponse;
  return data;
}
