import styled from "styled-components";
import { spacing } from "@design/tokens/spacing/spacing";

const StyledAlertCard = styled.div`
  border: 1px solid #d1d5db; /* Color del borde */
  border-radius: 8px; /* Esquinas redondeadas */
  padding: ${spacing.s150};
  background-color: #ffffff; /* Fondo blanco */
  max-width: 400px;
`;

export { StyledAlertCard };
