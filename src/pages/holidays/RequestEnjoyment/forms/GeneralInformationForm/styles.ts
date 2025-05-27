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
    ${({ theme }) => theme?.palette?.neutral?.N30 ?? inube.palette.neutral.N30};
  padding: ${({ $isMobile }) => ($isMobile ? spacing?.s200 : spacing.s300)};

  textarea {
    resize: none;
  }
`;

const StyledDateContainer = styled.div`
  display: flex;
  gap: ${spacing.s025};
  && > div {
    width: auto;
  }

  && input {
    width: 100%;
  }
`;

export { StyledContainer, StyledDateContainer };
