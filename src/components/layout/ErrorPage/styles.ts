import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { spacing } from "@design/tokens/spacing";

interface StyledCertificationsContainerProps {
  $isMobile: boolean;
  theme?: typeof inube;
}

interface VerticalDividerProps {
  $isVertical: boolean;
  theme?: typeof inube;
  height?: string;
  color?: string;
}

interface Theme {
  theme?: typeof inube;
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 98dvh;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const StyledCompanyLogo = styled.img`
  width: 100%;
  max-width: 54px;
  height: auto;

  @media screen and (max-width: 600px) {
    max-width: 40px;
    margin: 0 auto;
  }
`;

const StyledErrorImage = styled.img`
  width: 100%;
  max-width: 256px;
  height: auto;
  margin: 0 auto;

  @media screen and (max-width: 600px) {
    max-width: 180px;
  }
`;

const StyledFooter = styled.footer<Theme>`
  width: 100%;
  justify-content: center;
  padding: ${spacing.s200} 0;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
  margin-top: auto;
`;

const StyledCertificationsContainer = styled.div<StyledCertificationsContainerProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  gap: ${spacing.s250};
  border-radius: ${spacing.s100};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N40 ?? inube.palette.neutral.N40};
  padding: ${({ $isMobile }) =>
    $isMobile ? `${spacing.s300} ${spacing.s150}` : spacing.s300};
  box-sizing: border-box;
`;

const VerticalDivider = styled.div<VerticalDividerProps>`
  display: ${({ $isVertical }) => ($isVertical ? "block" : "none")};
  width: 0;
  height: ${({ height }) => height ?? "100%"};
  border-left: 1px dashed
    ${({ color, theme }) =>
      color ?? theme?.palette?.neutral?.N40 ?? inube.palette.neutral.N40};
  margin: 0 auto;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const StyledMainContent = styled.div<StyledCertificationsContainerProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ $isMobile }) =>
    $isMobile ? "20px 10px 0px 10px" : "40px 20px 0px 20px"};
  width: 100%;
  max-width: 1280px;
  box-sizing: border-box;
`;

const StyledDiv = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #59667a;
  font-weight: 400;
`;

export {
  StyledContainer,
  StyledCompanyLogo,
  StyledErrorImage,
  StyledFooter,
  StyledCertificationsContainer,
  VerticalDivider,
  StyledMainContent,
  StyledDiv,
};
