import styled from "styled-components";
import { inube } from "@inubekit/foundations";
import { spacing } from "@design/tokens/spacing/spacing.ts";

interface StyledCertificationsContainerProps {
  $isMobile: boolean;
  theme?: typeof inube;
}

interface Theme {
  theme?: typeof inube;
}

interface VerticalDividerProps {
  $isVertical: boolean;
  theme?: typeof inube;
}

const StyledCompanyLogo = styled.img`
  max-width: 300px;

  @media screen and (max-width: 1000px) {
    margin: 0 auto;
    max-width: 250px;
  }
`;

const StyledErrorImage = styled.img`
  justify-self: center;
  max-width: 100%;
`;

const StyledFooter = styled.footer<Theme>`
  bottom: 0;
  width: 100%;
  justify-content: center;
  position: absolute;
  padding: ${spacing.s200} ${spacing.s0};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
`;

const StyledCertificationsContainer = styled.div<StyledCertificationsContainerProps>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s250};
  border-radius: ${spacing.s100};
  border: 1px solid
    ${({ theme }) =>
      theme && theme.palette?.neutral?.N40
        ? theme.palette.neutral.N40
        : inube.palette.neutral.N40};
  padding: ${({ $isMobile }) =>
    $isMobile ? `${spacing.s300} ${spacing.s150}` : spacing.s300};
`;

const VerticalDivider = styled.div<VerticalDividerProps>`
  width: 1px;
  height: 100%;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
`;

export {
  StyledCompanyLogo,
  StyledErrorImage,
  StyledFooter,
  StyledCertificationsContainer,
  VerticalDivider,
};
