import styled from "styled-components";
import { inube } from "@inubekit/foundations";
import { spacing } from "@design/tokens/spacing/spacing";

interface StyledContainerProps {
  $isMobile: boolean;
  theme?: typeof inube;
}

const StyledContainer = styled.div<StyledContainerProps>`
  display: flex;
  flex-direction: ${({ $isMobile }) =>
    $isMobile
      ? "column"
      : "row"}; /* Ajusta la dirección dependiendo del tamaño */
  gap: ${spacing?.s250 || "16px"};
  border-radius: ${spacing?.s100 || "8px"};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  padding: ${({ $isMobile }) =>
    $isMobile
      ? `${spacing?.s300 || "24px"} ${spacing?.s150 || "12px"}`
      : spacing?.s300 || "24px"};
  width: 100%; /* Asegura que el contenedor ocupe todo el ancho disponible */

  /* Asegura que los elementos hijos (AlertCard) se expandan */
  > * {
    flex-grow: 1;
  }

  textarea {
    resize: none;
  }
`;

export { StyledContainer };
