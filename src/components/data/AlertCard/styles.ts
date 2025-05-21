import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing/spacing";

interface IStyledContainer {
  theme: typeof inube;
}

const StyledAlertCard = styled.div<IStyledContainer>`
  border-radius: 8px;
  padding: ${spacing.s200};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
  border: 1px solid
    ${({ theme }) =>
      theme?.palette?.neutral?.N200 || inube.palette.neutral.N200};
`;

export { StyledAlertCard };
