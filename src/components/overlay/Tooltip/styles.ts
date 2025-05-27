import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledTooltipContainer {
  theme?: typeof inube;
}

const StyledTooltipContainer = styled.div<IStyledTooltipContainer>`
  width: fit-content;
  padding: ${spacing.s100};
  border-radius: 4px;
  background-color: ${({ theme }) =>
    theme?.palette?.neutralAlpha?.N300A || inube.palette.neutralAlpha.N300A};
`;

export { StyledTooltipContainer };
