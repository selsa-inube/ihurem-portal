import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing/spacing";

interface StyledContainerProps {
  $isMobile: boolean;
  theme?: typeof inube;
}

const StyledContainer = styled.div<StyledContainerProps>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s200};
  border-radius: ${spacing?.s100 ?? "8px"};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  padding: ${({ $isMobile }) =>
    $isMobile ? `${spacing?.s200 ?? "24px"} ` : (spacing?.s200 ?? "24px")};

  textarea {
    resize: none;
  }
`;

export { StyledContainer };
