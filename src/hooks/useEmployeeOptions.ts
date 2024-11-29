import { useState, useEffect } from "react";
import { getEmployeeOptions } from "@services/employeePortal/getOptionsConsultation";
import { IEmployeeOptions } from "@ptypes/employeePortalBusiness.types";

export const useEmployeeOptions = (employeeId: string) => {
  const [data, setData] = useState<IEmployeeOptions[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      setError(null);

      try {
        const options = await getEmployeeOptions(employeeId);
        setData(options);
      } catch (err) {
        setError("Error al obtener las opciones del empleado");
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchOptions();
    }
  }, [employeeId]);

  return { data, loading, error };
};
