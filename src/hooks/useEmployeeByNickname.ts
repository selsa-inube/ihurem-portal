import { useState, useEffect } from "react";
import { IEmployee } from "@ptypes/employeePortalBusiness.types";
import { employeeByNickname } from "@services/employeePortal/getEmployeeInquiry";

export const useEmployeeByNickname = (nickname: string) => {
  const [employee, setEmployee] = useState<IEmployee | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nickname) return;

    const fetchEmployee = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await employeeByNickname(nickname);

        if (Object.keys(result).length === 0) {
          setEmployee(null);
        } else {
          setEmployee(result);
        }
      } catch (error) {
        setError("Error al obtener los datos del empleado");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [nickname]);

  return { employee, loading, error };
};
