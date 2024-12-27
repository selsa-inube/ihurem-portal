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
  height?: string;
  color?: string;
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

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
  width: 100%;
  justify-content: center;
  padding: ${spacing.s200} ${spacing.s0};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
`;

const StyledCertificationsContainer = styled.div<StyledCertificationsContainerProps>`
  display: flex;
  flex-direction: column;
  width: 1280px;
  max-width: 100%;
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
  width: 0;
  height: ${({ height }) => height ?? "100%"};
  border-left: 1px dashed
    ${({ color, theme }) =>
      color ?? theme?.palette?.neutral?.N40 ?? inube.palette.neutral.N40};
  margin: 0 auto;
`;

const StyledMainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${spacing.s200};
`;

export {
  StyledContainer,
  StyledCompanyLogo,
  StyledErrorImage,
  StyledFooter,
  StyledCertificationsContainer,
  VerticalDivider,
  StyledMainContent,
};
