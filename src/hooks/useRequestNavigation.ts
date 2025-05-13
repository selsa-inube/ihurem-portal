import { useNavigate } from "react-router-dom";

export function useRequestNavigation() {
  const navigate = useNavigate();

  const navigateAfterSubmission = (typeRequest: string) => {
    if (typeRequest === "vacations") {
      navigate("/holidays", {
        state: {
          showFlag: true,
          flagTitle: "Solicitud enviada",
          flagMessage: "La solicitud de vacaciones fue enviada exitosamente.",
          isSuccess: true,
        },
      });
    } else if (typeRequest === "certifications") {
      navigate("/certifications", {
        state: {
          showFlag: true,
          flagTitle: "Solicitud enviada",
          flagMessage:
            "La solicitud de certificación fue enviada exitosamente.",
          isSuccess: true,
        },
      });
    }
  };

  return { navigateAfterSubmission };
}
