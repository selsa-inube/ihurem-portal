import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing/spacing";

interface StyledCertificationsContainerProps {
  $isMobile: boolean;
  theme?: typeof inube;
}

const StyledCertificationsContainer = styled.div<StyledCertificationsContainerProps>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s250};
  border-radius: ${spacing.s100};
  border: 1px solid
    ${({ theme }) =>
      theme && theme.palette?.neutral?.N30
        ? theme.palette.neutral.N30
        : inube.palette.neutral.N30};
  padding: ${({ $isMobile }) =>
    $isMobile ? `${spacing.s300} ${spacing.s150}` : spacing.s300};

  & > div:nth-child(2) {
    overflow: initial;
  }
`;

const StyledValueText = styled.div`
  background-color: #fafbfc;
  justify-content: center;
  align-items: center;
  border-radius: ${spacing.s100};
  display: flex;
  padding: ${spacing.s075} ${spacing.s200};
  width: 100%;
  max-width: 502px;
  height: ${spacing.s400};
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
`;

export { StyledCertificationsContainer, StyledValueText };
