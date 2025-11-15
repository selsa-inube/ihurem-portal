import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledContainer {
  $isMobile: boolean;
  theme?: typeof inube;
}

interface IStyledEmptyMessage {
  theme?: typeof inube;
}

const StyledContainer = styled.div<IStyledContainer>`
  display: flex;
  flex-direction: column;
  border-radius: ${spacing.s100};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 ?? inube.palette.neutral.N30};
  padding: ${({ $isMobile }) => ($isMobile ? spacing?.s200 : spacing.s300)};

  textarea {
    resize: none;
  }
`;

const StyledEmptyMessage = styled.div<IStyledEmptyMessage>`
  border-radius: ${spacing.s050};
  background-color: ${({ theme }) =>
    theme?.palette?.purple?.P50 ?? inube.palette.purple.P50};
  padding: ${spacing.s250};
  gap: ${spacing.s200};
  display: flex;
  align-items: center;
`;

export { StyledContainer, StyledEmptyMessage };
