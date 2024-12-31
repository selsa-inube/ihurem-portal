import React from "react";
import { MdWarning } from "react-icons/md";
import { useMediaQuery } from "@inubekit/hooks";
import { AlertCard } from "@components/data/NotificationAlert";
import { StyledContainer } from "./styles";

const AlertCardContainer: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 700px)");

  const alerts = [
    {
      title: "Alerta 1",
      requirement: "Debe completar los datos personales.",
      cause: "No se ha proporcionado información requerida.",
      icon: <MdWarning />,
    },
    {
      title: "Alerta 2",
      requirement: "Debe realizar el pago pendiente.",
      cause: "No se ha registrado el comprobante de pago.",
      icon: <MdWarning />,
    },
  ];

  return (
    <StyledContainer $isMobile={isMobile}>
      {alerts.map((alert, index) => (
        <AlertCard key={index} {...alert} />
      ))}
    </StyledContainer>
  );
};

export { AlertCardContainer };
