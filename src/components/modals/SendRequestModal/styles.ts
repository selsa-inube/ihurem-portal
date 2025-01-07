import styled from "styled-components";
import { inube } from "@inubekit/foundations";

import { spacing } from "@design/tokens/spacing/spacing";

interface IStyledModal {
  $smallScreen: boolean;
  theme?: typeof inube;
}

const StyledModal = styled.div<IStyledModal>`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  max-height: 382px;
  height: ${({ $smallScreen }) => ($smallScreen ? "206px" : "auto")};
  width: ${({ $smallScreen }) => ($smallScreen ? "335px" : "450px")};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? spacing.s200 : spacing.s300};
  gap: ${spacing.s300};
  border-radius: ${spacing.s100};

  textarea {
    resize: none;
  }
`;

const StyledContainerClose = styled.div`
  cursor: pointer;
`;

export { StyledModal, StyledContainerClose };
