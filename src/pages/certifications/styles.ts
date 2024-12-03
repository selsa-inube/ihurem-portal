import styled from "styled-components";
import { inube } from "@inubekit/foundations";

import { spacing } from "@design/tokens/spacing/spacing";

interface Theme {
  palette: {
    neutral: {
      N30: string;
    };
  };
}

interface StyledCertificationsContainerProps {
  $isMobile: boolean;
  theme?: Theme;
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
`;

export { StyledCertificationsContainer };
