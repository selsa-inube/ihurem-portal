import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledContainerForm {
  $smallScreen: boolean;
  theme?: typeof inube;
}

const StyledContainerForm = styled.div<IStyledContainerForm>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
  width: ${({ $smallScreen }) => ($smallScreen ? "auto" : "402px")};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? spacing.s200 : spacing.s300};
  gap: ${({ $smallScreen }) => ($smallScreen ? spacing.s200 : spacing.s250)};
  border-radius: ${spacing.s100};
  box-shadow: 0px 6px 10px 4px
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
`;

export { StyledContainerForm };
