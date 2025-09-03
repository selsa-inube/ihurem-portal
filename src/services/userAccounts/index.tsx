import { decrypt } from "@utils/encrypt";
import { environment } from "@config/environment";
import { IPostUserAccountsResponse } from "./types";

export async function postUserAccountsData(
  ac: string,
  clientId: string,
  clientSecret: string,
  headers: Record<string, string>,
): Promise<IPostUserAccountsResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const decryptedClientId = decrypt(clientId);
    const decryptedClientSecret = decrypt(clientSecret);
    const credentials = `${decryptedClientId}:${decryptedClientSecret}`;
    const base64Credentials = btoa(credentials);

    const apiUrl = import.meta.env.DEV
      ? "/api/user-accounts"
      : `${environment.IAUTH_API_URL}/user-accounts`;

    const formData = new URLSearchParams();
    formData.append("authorizationValue", ac);

    console.log("🔄 Sending request with body:", formData.toString());
    console.log("📝 Authorization Value:", ac);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        ...headers,
        "X-Token": base64Credentials,
        "X-Action": "UserAuthenticationToken",
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: formData.toString(),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log("✅ Success response:", result);
    return result;
  } catch (error) {
    clearTimeout(timeoutId);

    throw error;
  }
}
