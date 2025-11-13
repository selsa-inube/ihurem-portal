import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledModal {
  $smallScreen: boolean;
  theme: typeof inube;
}

export const StyledModal = styled.div<IStyledModal>`
  display: flex;
  flex-direction: column;
  width: ${({ $smallScreen }) => ($smallScreen ? "303px" : "502px")};
  background-color: ${inube.palette.neutral.N0};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? spacing.s150 : spacing.s300};
  gap: ${({ $smallScreen }) => ($smallScreen ? spacing.s300 : spacing.s300)};
  border-radius: ${spacing.s100};
`;

export const StyledContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s200};
`;

export const StyledContainerClose = styled.div`
  cursor: pointer;
  align-content: center;
`;

export const StyledContainerTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;

export const StyledMessageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.s200};
  padding: ${spacing.s200};
  border-radius: ${spacing.s050};
  background-color: ${inube.palette.purple.P50};
`;
