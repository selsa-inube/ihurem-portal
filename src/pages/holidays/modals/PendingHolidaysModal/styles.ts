import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing/spacing";

interface IStyledModalProps {
  $smallScreen: boolean;
  theme: typeof inube;
}

export const StyledModal = styled.div<IStyledModalProps>`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: ${({ $smallScreen }) => ($smallScreen ? "88vh" : "82vh")};
  width: ${({ $smallScreen }) => ($smallScreen ? "311px" : "402px")};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? `${spacing.s300} ${spacing.s150}` : spacing.s300};
  border-radius: ${spacing.s100};
  box-shadow: ${spacing.s0} ${spacing.s050} ${spacing.s100} rgba(0, 0, 0, 0.1);
`;

export const StyledContainerClose = styled.div`
  cursor: pointer;
`;

export const StyledContainerTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.s200};
`;

export const StyledContainerContent = styled.div<IStyledModalProps>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s200};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? `${spacing.s300} ${spacing.s150}` : spacing.s300};
  border-radius: ${spacing.s100};
  margin-top: ${spacing.s300};
  border: 1px solid
    ${({ theme }) =>
      theme && theme.palette?.neutral?.N30
        ? theme.palette.neutral.N30
        : inube.palette.neutral.N30};
`;
