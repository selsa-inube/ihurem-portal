import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing/spacing";

interface IStyledContainer {
  $isMobile: boolean;
  theme: typeof inube;
}

const StyledAlertCard = styled.div<IStyledContainer>`
  border: 1px solid
    ${({ theme }) =>
      theme?.palette?.neutral?.N300 || inube.palette.neutral.N300};
  border-radius: 8px;
  padding: ${spacing.s150};
  max-width: 100%;
`;

export { StyledAlertCard };
