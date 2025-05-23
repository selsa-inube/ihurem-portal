import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface StyledContainerProps {
  $isMobile: boolean;
  theme?: typeof inube;
}

const StyledContainer = styled.div<StyledContainerProps>`
  display: grid;
  grid-template-columns: ${({ $isMobile }) =>
    $isMobile ? "1fr" : "repeat(2, 1fr)"};
  gap: ${spacing.s200};
  border-radius: ${spacing.s100};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  padding: ${({ $isMobile }) => ($isMobile ? spacing.s150 : spacing.s300)};
`;

export { StyledContainer };
