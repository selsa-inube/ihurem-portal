import { useState, useEffect } from "react";
import { useHeaders } from "@hooks/useHeaders";
import { postUserAccountsData } from "@services/userAccounts";
import { IPostUserAccountsResponse } from "@src/services/userAccounts/types";

import { useErrorFlag } from "./useErrorFlag";

export const usePostUserAccountsData = (
  clientId: string,
  clientSecret: string,
) => {
  const [data, setData] = useState<IPostUserAccountsResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [flagShown, setFlagShown] = useState(false);

  const { getHeaders } = useHeaders();

  useErrorFlag(
    flagShown,
    "Error al obtener los datos de cuentas de usuario",
    "Error en la consulta",
    false,
  );

  useEffect(() => {
    const postUserAccounts = async () => {
      setIsLoading(true);
      setFlagShown(false);
      setError(null);

      try {
        const urlParams = new URLSearchParams(window.location.search);
        const ac = urlParams.get("ac");

        if (!ac) {
          throw new Error('Parámetro "ac" no encontrado en la URL');
        }

        if (!clientId || !clientSecret) {
          throw new Error(
            "Los parámetros clientId y clientSecret son requeridos",
          );
        }

        const headers = await getHeaders();

        const response = await postUserAccountsData(
          ac,
          clientId,
          clientSecret,
          headers,
        );
        setData(response);
        return response;
      } catch (err) {
        const errorInstance =
          err instanceof Error ? err : new Error(String(err));
        setError(errorInstance);
        setFlagShown(true);
        throw errorInstance;
      } finally {
        setIsLoading(false);
      }
    };
    if (clientId && clientSecret) {
      postUserAccounts();
    }
  }, [clientId, clientSecret]);

  const reset = () => {
    setError(null);
    setFlagShown(false);
  };

  return {
    data,
    isLoading,
    error,
    reset,
  };
};
