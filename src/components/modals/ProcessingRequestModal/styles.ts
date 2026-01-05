import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledModal {
  $smallScreen: boolean;
  theme?: typeof inube;
}

interface IStyledContainer {
  $isMobile: boolean;
  theme: typeof inube;
}

const StyledModal = styled.div<IStyledModal>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: inherit;
  width: ${({ $smallScreen }) => ($smallScreen ? "303px" : "502px")};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? spacing.s200 : spacing.s300};
  gap: ${spacing.s150};
  border-radius: ${spacing.s100};
`;

const StyledContainer = styled.div<IStyledContainer>`
  padding: ${spacing.s150};
  gap: ${spacing.s200};
  border-radius: 8px;
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
`;

export { StyledModal, StyledContainer };
