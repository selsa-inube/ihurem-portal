import { environment } from "@config/environment";

import { IRequestBody, IHumanResourceResponse } from "./types";

export async function postHumanResourceRequest(
  requestBody: IRequestBody,
  headers: Record<string, string>,
): Promise<IHumanResourceResponse> {
  const response = await fetch(
    `${environment.IVITE_IHUREM_PERSISTENCE_PROCESS_SERVICE}/human-resources-requests`,
    {
      method: "POST",
      headers: {
        ...headers,
        "X-Action": "SaveHumanResourcesRequest",
      },
      body: JSON.stringify(requestBody),
    },
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = (await response.json()) as IHumanResourceResponse;
  return data;
}
