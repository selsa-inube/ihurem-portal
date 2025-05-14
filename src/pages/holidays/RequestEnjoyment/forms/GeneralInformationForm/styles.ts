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
  gap: ${spacing?.s250 ?? "16px"};
  border-radius: ${spacing?.s100 ?? "8px"};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 ?? inube.palette.neutral.N30};
  padding: ${({ $isMobile }) =>
    $isMobile
      ? `${spacing?.s300 ?? "24px"} ${spacing?.s150 ?? "12px"}`
      : (spacing?.s300 ?? "24px")};

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
