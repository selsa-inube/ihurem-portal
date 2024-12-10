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
  width: ${({ $smallScreen }) => ($smallScreen ? "300px" : "450px")};
  background-color: ${inube.palette.neutral.N0};
  padding: ${spacing.s300};
  gap: ${spacing.s300};
  border-radius: ${spacing.s100};
`;

export const StyledContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 4px;
`;

export const StyledContainerClose = styled.div`
  cursor: pointer;
`;

export const StyledContainerTitle = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: space-between;
`;
