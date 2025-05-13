import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing/spacing";

interface IStyledModal {
  $smallScreen: boolean;
  theme: typeof inube;
}

interface IStyledTableContainer {
  $smallScreen: boolean;
  theme: typeof inube;
}

export const StyledModal = styled.div<IStyledModal>`
  overflow: auto;
  display: flex;
  flex-direction: column;
  max-height: "auto";
  width: ${({ $smallScreen }) => ($smallScreen ? "303px" : "502px")};
  max-height: ${({ $smallScreen }) => ($smallScreen ? "476px" : "484px")};
  background-color: ${inube.palette.neutral.N0};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? spacing.s200 : spacing.s300};
  gap: ${({ $smallScreen }) => ($smallScreen ? spacing.s200 : spacing.s300)};
  border-radius: ${spacing.s100};

  ::-webkit-scrollbar {
    width: 8px;
    border-radius: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
    border-radius: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme?.palette?.neutral?.N50 || inube.palette.neutral.N50};
    border-radius: 8px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) =>
      theme?.palette?.neutral?.N70 || inube.palette.neutral.N70};
  }
`;

export const StyledContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: ${spacing.s200};
  padding: ${spacing.s075};
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

export const StyledBoxAttribute = styled.div<IStyledModal>`
  align-items: center;
  border-radius: 8px;
  padding: ${({ $smallScreen }) =>
    $smallScreen ? spacing.s100 : `${spacing.s075} ${spacing.s150}`};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
  width: auto;
`;

export const StyledTableContainer = styled.div<IStyledTableContainer>`
  width: 98%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 2px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? `${spacing.s050} ${spacing.s0}` : `${spacing.s050}`};
  border-radius: 8px;
`;
