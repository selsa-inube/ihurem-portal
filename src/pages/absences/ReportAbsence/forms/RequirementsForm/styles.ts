import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface StyledContainerProps {
  $isMobile: boolean;
  $noRestriction?: boolean;
  theme?: typeof inube;
}

const StyledContainer = styled.div<StyledContainerProps>`
  display: grid;
  min-height: ${({ $isMobile }) => ($isMobile ? "304px" : "150px")};
  grid-template-columns: ${({ $isMobile, $noRestriction }) =>
    $noRestriction ? "1fr" : $isMobile ? "1fr" : "repeat(2, 1fr)"};
  gap: ${spacing?.s200};
  border-radius: ${spacing?.s100 ?? "8px"};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  padding: ${({ $isMobile }) =>
    $isMobile ? `${spacing?.s200 ?? "24px"} ` : (spacing?.s300 ?? "24px")};
`;

export { StyledContainer };
