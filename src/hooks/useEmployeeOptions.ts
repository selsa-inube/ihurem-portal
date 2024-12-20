import { useState, useEffect } from "react";
import { getEmployeeOptions } from "@services/employeePortal/getOptionsConsultation";
import { IEmployeeOptions } from "@ptypes/employeePortalBusiness.types";

export const useEmployeeOptions = (employeeId: string) => {
  const [data, setData] = useState<IEmployeeOptions[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      setError(null);

      try {
        const options = await getEmployeeOptions();
        console.log("Opciones obtenidas:", options);
        if (options.length === 0) {
          setError("No existen opciones para el empleado");
        }
        setData(options);
        setLoading(false);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Error al obtener las opciones del empleado";
        setError(errorMessage);
      }
    };

    if (employeeId) {
      fetchOptions();
    }
  }, [employeeId]);

  return { data, loading, error };
};
