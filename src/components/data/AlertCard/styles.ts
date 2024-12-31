import styled from "styled-components";
import { inube } from "@inubekit/foundations";
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
`;

export { StyledAlertCard };
