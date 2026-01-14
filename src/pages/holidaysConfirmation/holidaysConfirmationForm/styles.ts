import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledHolidaysConfirmationFormContainer {
  $isMobile: boolean;
  theme: typeof inube;
}

interface IStyledDescriptionContainer {
  theme: typeof inube;
}

const StyledHolidaysConfirmationFormContainer = styled.div<IStyledHolidaysConfirmationFormContainer>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  width: ${({ $isMobile }) => ($isMobile ? "296px" : "786px")};
  padding: ${({ $isMobile }) => ($isMobile ? spacing.s200 : spacing.s400)};
  gap: ${({ $isMobile }) => ($isMobile ? spacing.s200 : spacing.s300)};
  background-color: ${inube.palette.neutral.N0};
`;

const StyledDescriptionContainer = styled.div<IStyledDescriptionContainer>`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${spacing.s200};
  gap: ${spacing.s150};
  border-radius: 8px;
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  box-sizing: border-box;
  align-items: flex-start;
`;

export { StyledHolidaysConfirmationFormContainer, StyledDescriptionContainer };
