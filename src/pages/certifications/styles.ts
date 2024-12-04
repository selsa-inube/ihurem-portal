import styled from "styled-components";
import { inube } from "@inubekit/foundations";
import { spacing } from "@design/tokens/spacing/spacing";

interface StyledCertificationsContainerProps {
  $isMobile: boolean;
  theme?: typeof inube;
}

const StyledCertificationsContainer = styled.div<StyledCertificationsContainerProps>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s250};
  border-radius: ${spacing.s100};
  border: 1px solid
    ${({ theme }) =>
      theme && theme.palette?.neutral?.N30
        ? theme.palette.neutral.N30
        : inube.palette.neutral.N30};
  padding: ${({ $isMobile }) =>
    $isMobile ? `${spacing.s300} ${spacing.s150}` : spacing.s300};
`;

const StyledValueText = styled.div`
  background-color: #fafbfc;
  border-radius: 8px;
  display: flex;
  padding: ${spacing.s075} ${spacing.s200};
  width: fit-content;
  width: 100%;
  max-width: 502px;
  height: 32px;
`;

export { StyledCertificationsContainer, StyledValueText };
