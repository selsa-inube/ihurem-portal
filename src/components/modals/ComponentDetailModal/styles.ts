import styled from "styled-components";
import { inube } from "@inubekit/foundations";
import { spacing } from "@design/tokens/spacing/spacing";

interface IStyledModal {
  $smallScreen: boolean;
  theme: typeof inube;
}

export const StyledModal = styled.div<IStyledModal>`
  overflow: auto;
  display: flex;
  flex-direction: column;
  max-height: ${({ $smallScreen }) => ($smallScreen ? "auto" : "526px")};
  width: ${({ $smallScreen }) => ($smallScreen ? "335px" : "450px")};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? spacing.s200 : spacing.s300};
  gap: ${spacing.s300};
  border-radius: ${spacing.s100};
`;

export const StyledContainerContent = styled.div<IStyledModal>`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-top: 4px;
  padding-right: 4px;
  padding-bottom: 4px;
  padding-left: 4px;
`;

export const StyledContainerClose = styled.div`
  cursor: pointer;
`;

export const StyledContainerTitle = styled.div`
  display: flex;
  margin: 0px;
  padding: 0px;
  justify-content: space-between;
`;
