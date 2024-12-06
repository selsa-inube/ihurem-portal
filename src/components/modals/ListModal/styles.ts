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
  max-height: ${({ $smallScreen }) => ($smallScreen ? "398px" : "382px")};
  width: ${({ $smallScreen }) => ($smallScreen ? "280px" : "493px")};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? spacing.s200 : spacing.s300};
  gap: ${({ $smallScreen }) => ($smallScreen ? spacing.s200 : spacing.s300)};
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

  ${({ $smallScreen, theme }) =>
    !$smallScreen &&
    `
    &::-webkit-scrollbar {
      width: 16px;
      height: 75px;
      border-radius: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${
        theme?.color?.surface?.gray?.regular || inube.palette.neutral.N30
      };
      };
      border-radius: 8px;
    }
  `}
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
