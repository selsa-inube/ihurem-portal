import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface StyledContainerProps {
  $isMobile: boolean;
  theme?: typeof inube;
}

const StyledContainer = styled.div<StyledContainerProps>`
  display: flex;
  flex-direction: column;
  border-radius: ${spacing.s100};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  padding: ${({ $isMobile }) => ($isMobile ? spacing?.s200 : spacing.s300)};

  textarea {
    resize: none;
  }
`;

export { StyledContainer };
