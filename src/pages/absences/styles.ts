import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface Theme {
  palette: {
    neutral: {
      N30: string;
    };
  };
}

interface StyledAbsencesContainerProps {
  $isMobile: boolean;
  theme?: Theme;
}

const StyledAbsencesContainer = styled.div<StyledAbsencesContainerProps>`
  border-radius: ${spacing.s100};
  border: 1px solid
    ${({ theme }) =>
      theme && theme.palette?.neutral?.N30
        ? theme.palette.neutral.N30
        : inube.palette.neutral.N30};

  & > div:nth-child(2) {
    overflow: initial;
  }
`;

export { StyledAbsencesContainer };
