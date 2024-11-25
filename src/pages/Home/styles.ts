import styled from "styled-components";
import { inube } from "@inubekit/foundations";
import { Link } from "react-router-dom";
import { spacing } from "@design/tokens/spacing/spacing";

interface Theme {
  palette: {
    neutral: {
      N10: string;
      N30: string;
    };
  };
}

interface StyledFooterProps {
  theme?: Theme;
}

interface StyledMainProps {
  $isTablet: boolean;
}

const StyledAppPage = styled.div`
  display: inherit;
  box-sizing: border-box;
`;

const StyledContainer = styled.div`
  display: inherit;
  overflow: hidden;
`;

const StyledMain = styled.main<StyledMainProps>`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: ${({ $isTablet }) =>
    $isTablet
      ? `${spacing.s400} ${spacing.s250} ${spacing.s0}`
      : `${spacing.s400} ${spacing.s800} ${spacing.s0}`};
`;

const StyledContentImg = styled(Link)`
  width: 100px;
`;

const StyledLogo = styled.img`
  max-width: 100px;
`;

const StyledFooter = styled.footer<StyledFooterProps>`
  margin-top: auto;
  display: flex;
  justify-content: center;
  padding: ${spacing.s200} ${spacing.s300};
  background-color: ${({ theme }) => {
    const neutralN10 = theme?.palette?.neutral?.N10;
    return neutralN10 ? neutralN10 : inube.palette.neutral.N10;
  }};
`;

export {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledFooter,
};
