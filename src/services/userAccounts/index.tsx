import { decrypt } from "@utils/encrypt";
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

    console.log("🔍 DATOS RECIBIDOS:");
    console.log("├── AC:", ac);
    console.log("├── Client ID (encrypted):", clientId);
    console.log("└── Client Secret (encrypted):", clientSecret);

    console.log("\n🔓 DESPUÉS DEL DECRYPT:");
    console.log("└── Credentials:", credentials);

    console.log("\n📤 ENVIANDO AL SERVICIO:");
    console.log("├── AC:", ac);
    console.log("└── Base64 Credentials:", base64Credentials);

    const response = await fetch(
      "https://four.external.iauth.persistence.process.inube.dev/iauth-persistence-process-service/api/user-accounts",
      {
        method: "POST",
        headers: {
          ...headers,
          "X-Token": base64Credentials,
          "X-Action": "UserAuthenticationToken",
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: `authorizationValue=${ac}`,
        signal: controller.signal,
      },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    throw error;
  }
}
